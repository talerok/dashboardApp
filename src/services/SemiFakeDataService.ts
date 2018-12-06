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

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }),
  };

@Injectable()
export class SemiFakeDateService implements DataService {

    private _baseUrl: string = "http://sigma.malahitsoft.ru/webapi/sigma/";

    private _fakeService: DataService = new FakeDataService();

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
        return this._http.post(this._baseUrl + url,  JSON.stringify(data), httpOptions).toPromise().then((x) => {
            this._stopLoading();
            return x;
        });
    }

    private _get(url: string) : Promise<any>{
        this._initLoading();
        return this._http.get(this._baseUrl + url, httpOptions).toPromise().then((x) => {
            this._stopLoading();
            return x;
        });
    }


    async GetAllStationIndicators() :  Promise<Indicator[]>{
        try{
            return await this._get("indicators").then(data => data.map((x : any) => new Indicator(x.indicatorID, x.indicatorName, x.unitMeasure, x.indicatorType)));
        }catch(ex){
            console.log(ex);
            return [];
        }
    }
    
    async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>{
        try{
            return await this._get("powerhousedatatest?IndicatorId=" + indicator.Id + "&Date=" + date.toJSON()).then(data => 
            data.powerHousesData.map((x: any) => new IndicatorValue<Station>(
                x.indicatorValuePlan ? Math.round(x.indicatorValuePlan) : 0,
                x.indicatorValueFact ? Math.round(x.indicatorValueFact) : 0,
                x.indicatorValueCurrentPeriod ? Math.round(x.indicatorValueCurrentPeriod) : 0,
                Status.Fine,
                new Station(x.powerHouseID, x.powerHouseName, x.powerHouseType, [], x.coordinateX, x.coordinateY, []))));
        }catch(ex) {
            console.log(ex);
            return [];
        }
    }
    
    async GetStations() : Promise<Station[]>{
        try{
            let indicators : Indicator[] = (await this._get("indicatorgroups")).map((x: any) => new Indicator(x.indicatorGroupID, x.indicatorGroupName, "", x.indicatorType));
            return await this._get("powerhouses").then(data => data.map((x: any) =>
                new Station(x.powerHouseID, x.powerHouseName, x.powerHouseType, indicators, x.coordinateX, x.coordinateY, 
                    x.powerUnits.map((s: any) => new StationBlock(s.powerUnitID, s.powerHouseID, s.powerUnitName, indicators, s.isActive)))));
        }catch(ex){
            return [];
        }   
    }
    
    async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date, period: Period):  Promise<any>{
        return this._fakeService.GetStationObjectData(object,indicator,date,period);
    }

    async GetDataFromPeriod(object: BaseStationObject, indicator: Indicator, date: Date, period: Period) : Promise<MultiIndicatorValue>{
        return this._fakeService.GetDataFromPeriod(object, indicator, date, period);
    }

    async GetBlockCollection(blocks: StationBlock[]) : Promise<BlockCollection>{
        return this._fakeService.GetBlockCollection(blocks);
    }

    LoadEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private _http: HttpClient){
         //fake service load
        this. _fakeService.LoadEvent.subscribe((x : boolean) => {
            if(x)
                this._initLoading();
            else 
                this._stopLoading();
        });
    }
}