import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from "./Abstract/DataService";
import {FakeDataService} from "./FakeDataService";
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';

import { Indicator } from "../models/Indicator";
import { Station, StationBlock, BaseStationObject, BlockCollection } from "../models/Station";
import { IndicatorValue } from "../models/IndicatorValue";
import { Status } from "../models/Status";
import { Period } from "../models/Period";
import { MultiIndicatorValue } from "../models/MultiIndicatorValue";
import { StationObjectIndicatorValues } from '../models/StationObjectIndicatorValues';
import { Expansion } from '@angular/compiler';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }),
  };

@Injectable()
export class SemiFakeDateService implements DataService {

    //@ts-ignore
    private _baseUrl: string = globalConfig.baseUrl;

    private _loadCount : number = 0;

    private _initLoading() : void{
        this._loadCount++;
        if(this._loadCount === 1)
            this.LoadEvent.emit(true);
    }

    private _stopLoading() : void {
        this._loadCount--;
        if(this._loadCount === 0)
            this.LoadEvent.emit(false);
    }

    private _post(url: string, data: any) : Promise<any> {
        this._initLoading();
        try{
            return this._http.post(this._baseUrl + url,  JSON.stringify(data), httpOptions).toPromise().then((x) => {
                this._stopLoading();
                return x;
            });
        }catch{
            this._stopLoading();
            throw new Error("Loading error");
        }
    }

    private _get(url: string) : Promise<any>{
        this._initLoading();
        try{
            return this._http.get(this._baseUrl + url, httpOptions).toPromise().then((x) => {
                this._stopLoading();
                return x;
            });
        }catch{
            console.log(123);
            this._stopLoading();
            throw new Error("Loading error");
        }
    }

    private _dateConvert(date: Date) : string{
        return date.toISOString();
    }

    private _converIndicatorStatus(id: number) : Status{
        return id === 1 ? Status.Good : (id === 2 ? Status.Fine : Status.Bad);
    }

    private _convertPeriod(period: Period) : number{
        return period === Period.Day ? 3 :  (period === Period.Month ? 2 : 1);
    }

    private _indicatorGroups: Indicator[];

    private async _getIndicatorsGroup() : Promise<Indicator[]>{
        if(this._indicatorGroups)
            return this._indicatorGroups;
        else
            try{
                return await this._get("indicatorgroups").then(data => data.map((x: any) => new Indicator(x.indicatorGroupID, null, x.indicatorGroupName, "", x.indicatorType)));
            }catch(ex){
                console.log(ex);
                return [];
            }
    }
    

    async GetAllStationIndicators() :  Promise<Indicator[]>{
        try{
            return this._get("indicators").then(data => data.map((x : any) => new Indicator(x.indicatorID, x.indicatorGroupID, x.indicatorName, x.unitMeasure, x.indicatorType)));
        }catch(ex){
            console.log(ex);
            return [];
        }
    }
    
    async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>{
        try{
            return this._get("powerhousedatatest?IndicatorId=" + indicator.Id + "&Date=" + this._dateConvert(date)).then(data => 
            data.powerHousesData.map((x: any) => new IndicatorValue<Station>(
                x.indicatorValuePlan ? Math.round(x.indicatorValuePlan) : 0,
                x.indicatorValuePrevPeriod ? Math.round(x.indicatorValuePrevPeriod) : 0,
                x.indicatorValueFact ? Math.round(x.indicatorValueFact) : 0,
                this._converIndicatorStatus(x.indicatorStatus),
                new Station(x.powerHouseID, x.powerHouseName, x.powerHouseType, [], x.coordinateX, x.coordinateY, []))));
        }catch(ex) {
            console.log(ex);
            return [];
        }
    }
    
    async GetStations() : Promise<Station[]>{
        try{
            let indicators : Indicator[] = await this._getIndicatorsGroup();
            return this._get("powerhouses").then(data => data.map((x: any) =>
                new Station(x.powerHouseID, x.powerHouseName, x.powerHouseType, indicators, x.coordinateX, x.coordinateY, 
                    x.powerUnits.map((s: any) => new StationBlock(s.powerUnitID, s.powerHouseID, s.powerUnitName, indicators, s.isActive)))));
        }catch(ex){
            return [];
        }   
    }

    async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date, period: Period):  Promise<any>{
        try{
            if(object instanceof BlockCollection)
                throw new Error("block collection is not supported");

            let urlData = "?indicatorGroupID=" + indicator.Id + "&periodtype=" + this._convertPeriod(period) + "&date=" + this._dateConvert(date) + "&itemID=" + object.Id;
            return this._get("IndicatorGroupData" + urlData).then(data => {
                let res: IndicatorValue<Indicator>[] = data.indicatorGroupData.map((x: any) => 
                    new IndicatorValue<Indicator>(
                        x.indicatorValuePlan ? Math.round(x.indicatorValuePlan) : 0, 
                        x.indicatorValuePrevPeriod ? Math.round(x.indicatorValuePrevPeriod) : 0,  
                        x.indicatorValueFact ? Math.round(x.indicatorValueFact) : 0, 
                        this._converIndicatorStatus(x.indicatorStatus), 
                        new Indicator(x.indicatorID, x.indicatorGroupID, x.indicatorName, x.unitMeasure, x.indicatorType)));
                    return new StationObjectIndicatorValues(res);
                }
            );
        }catch(ex){
            console.log(ex);
            return new StationObjectIndicatorValues([]);
        }
    }

    private _convertDatePart(num: number) : string{
        if(num > 9)
            return num.toString();
        else
            return '0' + num.toString();
    }

    private _formateDate(date: string, period: Period): string{
        let convDate = new Date(date);
        switch(period){
            case Period.Day:
                return this._convertDatePart(convDate.getDate()) + "." + this._convertDatePart(convDate.getMonth() + 1) + "." + convDate.getFullYear()
                    + " " + this._convertDatePart(convDate.getHours()) + ":" + this._convertDatePart(convDate.getMinutes());
            case Period.Month:
                return this._convertDatePart(convDate.getDate()) + "." + this._convertDatePart(convDate.getMonth() + 1) + "." + convDate.getFullYear();
            case Period.Year:
                return this._convertDatePart(convDate.getMonth() + 1) + "." + convDate.getFullYear();
        }
    }

    async GetDataFromPeriod(object: BaseStationObject, indicator: Indicator, date: Date, period: Period) : Promise<MultiIndicatorValue>{
        try{
            let urlData = "?indicatorID=" + indicator.Id + "&periodtype=" + this._convertPeriod(period) + "&date=" + this._dateConvert(date) + "&itemID=" + object.Id;
            return this._get("IndicatorData" + urlData).then(data => {
                    let plan: number[] = [];
                    let prev: number[] = [];
                    let fact: number[] = [];
                    let dates: string[] = [];
                    data.indicatorData.forEach((x : any) => {
                        plan.push(x.indicatorValuePlan);
                        prev.push(x.indicatorValuePrevPeriod);
                        fact.push(x.indicatorValueFact)
                        dates.push(this._formateDate(x.date, period));
                    });
                    return new MultiIndicatorValue(plan,prev,fact, dates);
            });
        }catch(ex){
            console.log(ex);
            return new MultiIndicatorValue([],[],[],[]);
        }
    }

    async GetBlockCollection(blocks: StationBlock[]) : Promise<BlockCollection>{
        let indicators : Indicator[] = await this._getIndicatorsGroup();
        return new BlockCollection(blocks, indicators);
    }

    LoadEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private _http: HttpClient){
    }
}