import { Component, Input } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { Period } from '../../../models/Period'
import { Station, StationBlock } from '../../../models/Station'
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

    public CurBlock: StationBlock;

    constructor(private _dataSerice: DataService){
        _dataSerice.GetStations().then((x) => {
                this.StationOptions = x.map((i) => new CustomSelectOption("icon-" + i.Type + "-neutral", i.Name, "", i));
                this.CurStation = x[0];
                this.CurBlock = null;
            }
        )
    }

    public async RefreshData(){
       
    }

}