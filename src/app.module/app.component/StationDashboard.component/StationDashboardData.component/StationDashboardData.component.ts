import { Component, Input, SimpleChanges } from '@angular/core';
import { CustomSelectOption } from '../../../../models/CustomSelectOption'
import { Period } from '../../../../models/Period'
import { Station, StationBlock, BaseStationObject } from '../../../../models/Station'
import { DataService } from '../../../../services/Abstract/DataService';
import { CustomSelect } from '../../CustomSelect.component/CustomSelect.component';
import { Indicator } from '../../../../models/Indicator';
import { InfoCard } from '../../../../models/InfoCard';

@Component({
    selector: 'station-dashboard-data',
    templateUrl: './StationDashboardData.component.html',
    styleUrls: ['./StationDashboardData.component.less'],
})
export class StationDashboardData { 
    @Input() Object: BaseStationObject;
    @Input() Date: Date;

    private _generateOptions() : CustomSelectOption[]{
        return this.Object.Indicators.map((x) =>
            new CustomSelectOption("icon-" + x.Type + "-neutral", x.Name, x.Unit, x));
    }

    private _indicatorOptions: CustomSelectOption[];
    private _curIndicator: Indicator;
    
    private _cards: InfoCard[] = [];


    ngOnChanges(changes: SimpleChanges) {
        this._indicatorOptions = this._generateOptions();
        this._curIndicator = this._indicatorOptions[0].Value;
        this.RefreshData();
    }

    public async RefreshData(){
        this._cards = (await
            this._dataSerice.GetStationObjectData(this.Object, this._curIndicator, this.Date))
            .map((x) =>
                new InfoCard(x.Object.Name, "", x.Object, x)
            );
    }

    constructor(private _dataSerice: DataService){}

}