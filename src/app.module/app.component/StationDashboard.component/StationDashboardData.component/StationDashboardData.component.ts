import { Component, Input, SimpleChanges } from '@angular/core';
import { CustomSelectOption } from '../../../../models/CustomSelectOption'
import { Period } from '../../../../models/Period'
import { Station, StationBlock, BaseStationObject } from '../../../../models/Station'
import { DataService } from '../../../../services/Abstract/DataService';
import { CustomSelect } from '../../CustomSelect.component/CustomSelect.component';
import { Indicator } from '../../../../models/Indicator';
import { InfoCard } from '../../../../models/InfoCard';
import { MultiIndicatorValue } from '../../../../models/MultiIndicatorValue';

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

    private _chartData: MultiIndicatorValue;
    private _charPeriod: Period;
    private _curCard: InfoCard;

    ngOnChanges(changes: SimpleChanges) {
        this._indicatorOptions = this._generateOptions();
        this._curIndicator = this._indicatorOptions[0].Value;
        this.RefreshData();
    }

    private async _refreshChart(){
        this._chartData = await this._dataSerice.GetDataFromPeriod(this.Object, this._curCard.indicator, this.Date, this._charPeriod);
    }

    public async CardClick(card: InfoCard){
        if(this._curCard)
            this._curCard.Active = false;

        this._curCard = card;
        this._curCard.Active = true;
        this._refreshChart();
    }

    public async RefreshData(){
        this._cards = (await
            this._dataSerice.GetStationObjectData(this.Object, this._curIndicator, this.Date))
            .map((x) =>
                new InfoCard(x.Object.Name, "", x.Object, x)
            );
        this._charPeriod = Period.Day;
        this._chartData = null;
        if(this._curCard)
            this._curCard.Active = false;
        this._curCard = null;
    }

    private _setChartPeriod(period: Period){
        if(period == this._charPeriod)
            return;
        this._charPeriod = period;
        this._refreshChart();
    }

    private _getName() : string{
        return this.Object ? (this.Object instanceof Station ? "Электростанция" : this.Object.Name) : "";
    }

    constructor(private _dataSerice: DataService){
    }

}