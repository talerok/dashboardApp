import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { CustomSelectOption } from '../../../../models/CustomSelectOption'
import { Period } from '../../../../models/Period'
import { Station, StationBlock, BaseStationObject, BlockCollection } from '../../../../models/Station'
import { DataService } from '../../../../services/Abstract/DataService';
import { Indicator, IndicatorInfo } from '../../../../models/Indicator';
import { IndicatorValue } from '../../../../models/IndicatorValue'
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

    @Input() IndicatorInfo: IndicatorInfo;
    @Output() IndicatorInfoChange: EventEmitter<IndicatorInfo> = new EventEmitter<IndicatorInfo>(); 
    private _curIndicatorGroup: Indicator;
    private _curIndicator: Indicator;

    private _indicatorOptions: CustomSelectOption[] = [];

    private _chartData: MultiIndicatorValue;
    private _charPeriod: Period;
    private _chartName: string;

    private _data: any;

    private _generateOptions() : CustomSelectOption[]{
        return this.Object.Indicators.map((x) =>
            new CustomSelectOption("icon-" + x.Type + "-neutral", x.Name, x.Unit, x));
    }

    private refreshIndicatorGroup(){
        if(this.IndicatorInfo.ParentId){
            let indicator = this.Object.Indicators.find(x => x.Id === this.IndicatorInfo.ParentId);
            this._curIndicatorGroup = indicator ? indicator : this.Object.Indicators[0];
        }else{
            if(this._curIndicatorGroup){
                let indicator = this.Object.Indicators.find(x => x.Id === this._curIndicatorGroup.Id);
                this._curIndicatorGroup = indicator ? indicator : this.Object.Indicators[0];
            }else
                this._curIndicatorGroup = this.Object.Indicators[0];
        }
    }

    private refreshIndicator(){
        if(!(this._data instanceof StationObjectIndicatorValues) || !this._data.values.length){
            this._curIndicator = null;
            return;
        }
        var values = this._data.values;
        if(this.IndicatorInfo.Id){
            let val = values.find(x => x.Object.Id === this.IndicatorInfo.Id);
            this._curIndicator = val ? val.Object : values[0].Object;
        }else{
            if(this._curIndicator){
                let val = values.find(x => x.Object.Id === this._curIndicator.Id);
                this._curIndicator = val ? val.Object : values[0].Object;
            }else
            this._curIndicator = values[0].Object;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.Object)
            this._indicatorOptions = this._generateOptions();
    
        if(changes.Period)
            this._charPeriod = this.Period;
            
        this.refreshIndicatorGroup();
        this._refreshData();
    }

    private async _refreshData(){
        if(!this.Object || !this.Date || !this._curIndicatorGroup)
            return;

        this._data = await
            this._dataSerice.GetStationObjectData(this.Object, this._curIndicatorGroup, this.Date, this.Period); 
        this.refreshIndicator();

        this._refreshChart();
    }

    private _setChartPeriod(period: Period){
        if(period == this._charPeriod)
            return;
        this._charPeriod = period;
        this._refreshChart();
    }

    private _resetChart(){
        this._chartData = null;
        this._chartName = null;
    }

    private async _refreshChart(){
        if(!(this._data instanceof StationObjectIndicatorValues) || !this._curIndicator){
            this._resetChart();
            return;
        }
            
        this._chartData = await this._dataSerice.GetDataFromPeriod(this.Object, this._curIndicator, this.Date, this._charPeriod);
        this._chartName = this._curIndicator.Name;
        
    }

    private _activeView() :string {
        if(this._data instanceof StationObjectIndicatorValues)
            return "indicators";
        else if(this._data instanceof StateTable)
            return "state-table"
        else
            return "unknown";
    }

    private _getObjectName() : string{
        if(this.Object instanceof Station)
            return "Электростанция";
        else if(this.Object instanceof StationBlock)
            return this.Object.Name;
        else if(this.Object instanceof BlockCollection)
            return "Группа блоков";
        else 
            return "";
    }

    private _indicatorGroupChange(indicator: Indicator){
        this._curIndicatorGroup = indicator;
        this.refreshIndicator();
        this.IndicatorInfoChange.emit(
            new IndicatorInfo(this._curIndicator.Id, this._curIndicatorGroup.Id)
        );
    }

    private _cardClick(card: InfoCard<Indicator>){
        if(this._curIndicator === card.indicator)
            return;

        this._curIndicator = card.indicator;
        this.IndicatorInfoChange.emit(
            new IndicatorInfo(this._curIndicator.Id, this._curIndicatorGroup.Id)
        );
        this._refreshChart();
    }

    constructor(private _dataSerice: DataService){
    }

}