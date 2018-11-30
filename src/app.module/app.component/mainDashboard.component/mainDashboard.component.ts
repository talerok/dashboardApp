import { Component } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"
import { Station } from "../../../models/Station"
import { Indicator } from '../../../models/Indicator';
import { CustomSelectOption } from '../../../models/CustomSelectOption'
import { DataService } from '../../../services/Abstract/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'main-dashboard',
    templateUrl: './mainDashboard.component.html',
    styleUrls: ['./mainDashboard.component.less'],
})
export class MainDashboard { 

    private _mode: string;

    public GoToStationDashboard(info: InfoCard<Station>) : void{
        this._router.navigate(["/station", info.indicatorValue.Object.Id]);
    }

    public MapCardClick(info: InfoCard<Station>) : void{
        this._activeCard = info;
    }

    public Indicators: Indicator[] = [];

    public CurIndicator : Indicator;

    private _generateOptions(Indicators : Indicator[]) : CustomSelectOption[]{
        return Indicators.map((indicator) => {
            return new CustomSelectOption("icon-" + indicator.Type + "-neutral", indicator.Name, indicator.Unit, indicator);
        })
    }

    public IndicatorOptions : CustomSelectOption[] = [];

    public Cards : InfoCard<Station>[] = [
        
    ];

    public GetCountDescription() : string{
        let stringCount : string = this.Cards.length.toString();
        if(stringCount[stringCount.length - 1] === '1')
            return "Электростанция"
        else
            return "Электростанций" 
    }

    public GetSummValue() : number{
        return this.Cards.reduce(function(sum : number, current : InfoCard<Station>) {
            return sum + current.indicatorValue.Value;
          }, 0);  
    }

    public CurDate : Date = new Date();

    private _activeCard: InfoCard<Station>;

    public async RefreshData(){
        this.Cards = (await this._dataService.GetAllStationsData(this.CurIndicator, this.CurDate)).map((x) => {
            return new InfoCard(x.Object.Name,x.Object.Type,this.CurIndicator, x);
        });
        this._activeCard = null;
    }

    private _modeSubscription: Subscription;

    constructor(private _dataService : DataService, private _router: Router, private _activateRoute: ActivatedRoute){

        this._modeSubscription = _activateRoute.params.subscribe(params=> {
            if(!params['mode']){
                this._router.navigate(["main", "table"]);
                return;
            } 
            
            let mode = params['mode'].toLowerCase();

            if(mode === "map" || mode === 'table')
                this._mode = mode;
            else
                this._router.navigate(["main", "table"]);

        });

        this._dataService.GetAllStationIndicators().then((res) =>{
            this.Indicators = res;
            this.CurIndicator = res[0];
            this.IndicatorOptions = this._generateOptions(this.Indicators);
            this.RefreshData();
        });
    }

}