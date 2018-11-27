import { Component, Input } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { Period } from '../../../models/Period'
import { Station, BaseStationObject, StationBlock } from '../../../models/Station'
import { DataService } from '../../../services/Abstract/DataService';

import { ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'station-dashboard',
    templateUrl: './StationDashboard.component.html',
    styleUrls: ['./StationDashboard.component.less'],
})
export class StationDashboard { 
    public Date: Date = new Date();

    public PeriodOptions : CustomSelectOption[] = [
        new CustomSelectOption("icon-period", "Ежедневно", "", Period.Day),
        new CustomSelectOption("icon-period", "Ежемесячно", "", Period.Month),
        new CustomSelectOption("icon-period", "Ежегодично", "", Period.Year),
    ];

    public CurPeriod = Period.Month;

    public StationOptions : CustomSelectOption[] = [];

    public CurStation: Station;
    public CurObject: BaseStationObject;

    private _urlSubscription: Subscription;
    private _urlStationId : string;

    private _getActiveStationById(id: string) : Station{
        let option = this.StationOptions.find((x) => x.Value.Id === id);
        return option ? option.Value : (this.StationOptions.length ? this.StationOptions[0].Value : null);
    }

    private _setActiveStation(station: Station){
        this.CurStation = station;
        this.CurObject = station;
    }

    private _setActiveStationById(){
        let station = this._getActiveStationById(this._urlStationId);
        if(!station)
            return;
        this._setActiveStation(station);
    }

    constructor(private _dataSerice: DataService, private _activateRoute: ActivatedRoute, private _router: Router){
        this._urlSubscription = _activateRoute.params.subscribe(params=>{
            this._urlStationId = params['id'];
            this._setActiveStationById();
        });

        _dataSerice.GetStations().then((x) => {
                this.StationOptions = x.map((i) => new CustomSelectOption("icon-" + i.Type + "-neutral", i.Name, "", i));
                this._setActiveStationById();
            }
        )
    }

    private _onStationChange(){
        this._router.navigate(["/station", this.CurStation.Id]);
    }

}