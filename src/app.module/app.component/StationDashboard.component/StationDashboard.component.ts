import { Component, Input } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { Period } from '../../../models/Period'
import { Station, BaseStationObject, StationBlock, BlockCollection } from '../../../models/Station'
import { DataService } from '../../../services/Abstract/DataService';
import { ConvertService } from '../../../services/ConvertService'

import { ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { IndicatorInfo } from '../../../models/Indicator';

@Component({
    selector: 'station-dashboard',
    templateUrl: './StationDashboard.component.html',
    styleUrls: ['./StationDashboard.component.less'],
})
export class StationDashboard { 
    public Date: Date;

    public PeriodOptions : CustomSelectOption[] = [
        new CustomSelectOption("icon-period", "Ежедневно", "", Period.Day),
        new CustomSelectOption("icon-period", "Ежемесячно", "", Period.Month),
        new CustomSelectOption("icon-period", "Ежегодично", "", Period.Year),
    ];

    public CurPeriod = Period.Month;

    public StationOptions : CustomSelectOption[];

    public CurStation: Station;
    public CurObject: BaseStationObject;

    private _urlSubscription: Subscription;

    private _indicatorInfo: IndicatorInfo;

    private _getActiveStationById(id: string) : Station{
        let option = this.StationOptions.find((x) => x.Value.Id === id);
        return option ? option.Value : (this.StationOptions ? this.StationOptions[0].Value : null);
    }

    private _setActiveStation(station: Station){
        this.CurStation = station;
        this.CurObject = station;
    }

    private _setActiveStationById(urlStationId: string){
        let station = this._getActiveStationById(urlStationId);
        if(!station)
            return;
        this._setActiveStation(station);
    }

    //------------------------------------
    private _copyBlocks(blocks: StationBlock[]) : StationBlock[]{
        let res: StationBlock[] = [];
        blocks.forEach((x) =>{
            res.push(x);
        });
        return res;
    }

    private async _considerBlock(block: StationBlock){
        let blocks: StationBlock[];
        if(!(this.CurObject instanceof BlockCollection)){
            blocks = []
        }else{
            blocks = this._copyBlocks(this.CurObject.Blocks);
        }
            
        if(this._isBlockConsidered(block))
            return;

        blocks.push(block);
        this._setActiveObject(await this._dataSerice.GetBlockCollection(blocks));
     
    }

    private async _unConsiderBlock(block: StationBlock){
        if(!(this.CurObject instanceof BlockCollection))
            return;

        if(!this._isBlockConsidered(block))
            return;

        let blocks = this._copyBlocks(this.CurObject.Blocks);
    
        let index = blocks.indexOf(block);
        if(index === -1)
            return;
        if(blocks.length === 1)
            this.CurObject = this.CurStation;
        else{
            blocks.splice(index,1);
            this._setActiveObject(await this._dataSerice.GetBlockCollection(blocks));
        }
    }

    private _isBlockConsidered(block: StationBlock){
        return this.CurObject instanceof BlockCollection && this.CurObject.Blocks.indexOf(block) !== -1;
    }

    private _considerBlockClick(event: any, block: StationBlock){
        event.stopPropagation();
        if(this._isBlockConsidered(block))
            this._unConsiderBlock(block);
        else
            this._considerBlock(block);
    }

    private async _setActiveObject(object: BaseStationObject){
        this.CurObject = object;
    }

    private async _getStationOptions(){
        return this._dataSerice.GetStations().then(x => x.map((i) => new CustomSelectOption("icon-" + i.Type + "-neutral", i.Name, "", i)));
    }


    private async _onReloadPage(stationId: string, date: string, indicatorGroupId: string, indicatorId: string){
        if(!this.StationOptions)
            this.StationOptions = await this._getStationOptions();
        let newDate = new Date(date);
        if(!this.Date || newDate.getTime() != this.Date.getTime())
            this.Date = !isNaN(newDate.getTime()) ? newDate : new Date();
        if(!this.CurStation || this.CurStation.Id !== stationId)
            this._setActiveStationById(stationId);
        if(!this._indicatorInfo || this._indicatorInfo.Id != indicatorId || this._indicatorInfo.ParentId != indicatorGroupId){
            this._indicatorInfo = new IndicatorInfo(indicatorId, indicatorGroupId);
        }
    }

    //------------------------------------
    constructor(private _dataSerice: DataService, private _activateRoute: ActivatedRoute, private _router: Router, private _convertService: ConvertService){
        this._urlSubscription = _activateRoute.params.subscribe(params=>{
            this._onReloadPage(params['id'], params['date'], params['indicatorGroupId'], params['indicatorId']);
        });
    }

}