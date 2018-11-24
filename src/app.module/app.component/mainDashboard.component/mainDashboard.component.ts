import { Component } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"
import { Unit } from '../../../models/unit';
import { Indicator } from '../../../models/Indicator';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { DataService } from '../../../services/Abstract/DataService';

@Component({
    selector: 'main-dashboard',
    templateUrl: './mainDashboard.component.html',
    styleUrls: ['./mainDashboard.component.less'],
})
export class MainDashboard { 

    

    public CardClick(info: InfoCard) : void{
        console.log(info);
    }

    public Indicators: Indicator[] = [];

    public CurIndicator : Indicator;

    private _generateOptions(Indicators : Indicator[]) : CustomSelectOption[]{
        return Indicators.map((indicator) => {
            return new CustomSelectOption("icon-" + indicator.Unit.Identificator + "-neutral", indicator.Name, indicator.Unit.Name, indicator);
        })
    }

    public IndicatorOptions : CustomSelectOption[] = [];

    public Cards : InfoCard[] = [
        
    ];

    public GetCountDescription() : string{
        let stringCount : string = this.Cards.length.toString();
        if(stringCount[stringCount.length - 1] === '1')
            return "Электростанция"
        else
            return "Электростанций" 
    }

    public GetSummValue() : number{
        return this.Cards.reduce(function(sum : number, current : InfoCard) {
            return sum + current.value;
          }, 0);  
    }

    public CurDate : Date = new Date();


    public async RefreshData(){
        this.Cards = await this._dataService.GetAllStationsData(this.CurIndicator, this.CurDate);
    }

    constructor(private _dataService : DataService){
        this._dataService.GetAllStationIndicators().then((res) =>{
            this.Indicators = res;
            this.CurIndicator = res[0];
            this.IndicatorOptions = this._generateOptions(this.Indicators);
            this.RefreshData();
        });
    }

}