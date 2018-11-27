import { Component } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"
import { Indicator } from '../../../models/Indicator';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { DataService } from '../../../services/Abstract/DataService';
import { Router } from '@angular/router';

@Component({
    selector: 'main-dashboard',
    templateUrl: './mainDashboard.component.html',
    styleUrls: ['./mainDashboard.component.less'],
})
export class MainDashboard { 

    

    public CardClick(info: InfoCard) : void{
        this._router.navigate(["/station", info.indicatorValue.Object.Id]);
    }

    public Indicators: Indicator[] = [];

    public CurIndicator : Indicator;

    private _generateOptions(Indicators : Indicator[]) : CustomSelectOption[]{
        return Indicators.map((indicator) => {
            return new CustomSelectOption("icon-" + indicator.Type + "-neutral", indicator.Name, indicator.Unit, indicator);
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
            return sum + current.indicatorValue.Value;
          }, 0);  
    }

    public CurDate : Date = new Date();


    public async RefreshData(){
        this.Cards = (await this._dataService.GetAllStationsData(this.CurIndicator, this.CurDate)).map((x) => {
            return new InfoCard(x.Object.Name,x.Object.Type,this.CurIndicator, x);
        });
    }

    constructor(private _dataService : DataService, private _router: Router){
        this._dataService.GetAllStationIndicators().then((res) =>{
            this.Indicators = res;
            this.CurIndicator = res[0];
            this.IndicatorOptions = this._generateOptions(this.Indicators);
            this.RefreshData();
        });
    }

}