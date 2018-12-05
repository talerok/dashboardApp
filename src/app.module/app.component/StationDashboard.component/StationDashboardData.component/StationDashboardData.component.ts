import { Component, Input, SimpleChanges } from '@angular/core';
import { CustomSelectOption } from '../../../../models/CustomSelectOption'
import { Period } from '../../../../models/Period'
import { Station, StationBlock, BaseStationObject } from '../../../../models/Station'
import { DataService } from '../../../../services/Abstract/DataService';
import { CustomSelect } from '../../CustomSelect.component/CustomSelect.component';
import { Indicator } from '../../../../models/Indicator';
import { InfoCard } from '../../../../models/InfoCard';
import { MultiIndicatorValue } from '../../../../models/MultiIndicatorValue';
import { StationObjectIndicatorValues } from '../../../../models/StationObjectIndicatorValues'
import { StateTable, StateTableRow } from '../../../../models/StateTable';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'station-dashboard-data',
    templateUrl: './StationDashboardData.component.html',
    styleUrls: ['./StationDashboardData.component.less'],
})
export class StationDashboardData { 
    @Input() Object: BaseStationObject;
    @Input() Date: Date;
    @Input() Period: Period;

    private _generateOptions() : CustomSelectOption[]{
        return this.Object.Indicators.map((x) =>
            new CustomSelectOption("icon-" + x.Type + "-neutral", x.Name, x.Unit, x));
    }

    private _indicatorOptions: CustomSelectOption[];
    private _curIndicator: Indicator;
    
    private _data: any;
    private _dataType: string;

    private _chartData: MultiIndicatorValue;
    private _charPeriod: Period;
    private _curCard: InfoCard<Indicator>;

    ngOnChanges(changes: SimpleChanges) {
        this._indicatorOptions = this._generateOptions();
        this._curIndicator = this._indicatorOptions[0].Value;
        this.RefreshData();
    }

    private async _refreshChart(){
        this._chartData = await this._dataSerice.GetDataFromPeriod(this.Object, this._curCard.indicator, this.Date, this._charPeriod);
    }

    private _resetChart(){
        this._charPeriod = Period.Day;
        this._chartData = null;
    }

    private _resetCards(){
        if(this._curCard)
            this._curCard.Active = false;
        this._curCard = null;
    }

    private _resetDashboard(){
        this._resetCards();
        this._resetChart();
    }

    private _generateCards(soiv: StationObjectIndicatorValues) : InfoCard<Indicator>[]{
        return soiv.values.map((x) =>
            new InfoCard(x.Object.Name, "", x.Object, x)
        );
    }

    public async CardClick(card: InfoCard<Indicator>){
        if(this._curCard === card)
            return;

        if(this._curCard)
            this._curCard.Active = false;

        this._curCard = card;
        this._curCard.Active = true;
        this._refreshChart();
    }

    public async RefreshData(){
        let loadedData = await
            this._dataSerice.GetStationObjectData(this.Object, this._curIndicator, this.Date, this.Period); 
        if(loadedData instanceof StationObjectIndicatorValues){
            this._data = this._generateCards(loadedData);
            this._dataType = "cards";
        }
        else if(loadedData instanceof StateTable){
            this._data = loadedData;
            this._dataType = "stateTable";
        }
        else{
            this._dataType = null;
            this._data = null;
        }
        this._resetDashboard();
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