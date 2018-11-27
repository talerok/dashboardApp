import { Component, Input } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { Period } from '../../../models/Period'
import { Station, BaseStationObject, StationBlock } from '../../../models/Station'
import { DataService } from '../../../services/Abstract/DataService';

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

    constructor(private _dataSerice: DataService){
        _dataSerice.GetStations().then((x) => {
                this.StationOptions = x.map((i) => new CustomSelectOption("icon-" + i.Type + "-neutral", i.Name, "", i));
                this.CurStation = x[0];
                this.CurObject = this.CurStation;
            }
        )
    }

    private _onStationChange(){
       this.CurObject = this.CurStation;
    }

}