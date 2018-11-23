import { Component } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"
import { Unit } from '../../../models/unit';
import { Indicator } from '../../../models/Indicator';

@Component({
    selector: 'main-dashboard',
    templateUrl: './mainDashboard.component.html',
    styleUrls: ['./mainDashboard.component.less'],
})
export class MainDashboard { 

    
    private _testValueFunc(info: InfoCard) : string{
        var coef = info.value / info.planValue;
        if(coef > 0.9)
            return "good";
        else if(coef > 0)
            return "fine"
        else
            return "bad"
    }

    public CardClick(info: InfoCard) : void{
        console.log(info);
    }

    public Indicators: Indicator[] = [
        new Indicator("Текущая мощность",  new Unit("мВт","mvt")),
        new Indicator("Текущий расход топлива",  new Unit("тыс. тонн","tt"))
    ];

    public CurIndicator : Indicator = this.Indicators[0];

    public Cards : InfoCard[] = [
        
    ];

    public RefreshData() : void{
        this.Cards = [
            new InfoCard("Верхнетагильская ГРЭС","gres",this.CurIndicator.Unit,707,920,655, this._testValueFunc),
            new InfoCard("Гусиноозерская ГРЭС","gres",this.CurIndicator.Unit,527,510,496, this._testValueFunc),
            new InfoCard("Дхубгинская ТЭС","tes",this.CurIndicator.Unit,99,90,105, this._testValueFunc),
            new InfoCard("Ивановские ПГУ","gres",this.CurIndicator.Unit,0,350,288, this._testValueFunc),
            new InfoCard("Ириклинская ГРЭС","gres",this.CurIndicator.Unit,1186,1200,1182, this._testValueFunc),
            new InfoCard("Калининградская ТЭЦ-2","tec",this.CurIndicator.Unit,621,610,573, this._testValueFunc),
            new InfoCard("Каширская ГРЭС","gres",this.CurIndicator.Unit,349,420,325, this._testValueFunc),
            new InfoCard("Кастромская ГРЭС","gres",this.CurIndicator.Unit,2984,2950,2998, this._testValueFunc),
            new InfoCard("Маяковская ТЭС","tes",this.CurIndicator.Unit,150,180,172, this._testValueFunc),
            new InfoCard("Нижневартовкая ГРЭС","gres",this.CurIndicator.Unit,1983,1960,1724, this._testValueFunc),
            new InfoCard("Пермская ГРЭС","gres",this.CurIndicator.Unit,1040,1120,1037, this._testValueFunc),
            new InfoCard("Перегольская ГРЭС","gres",this.CurIndicator.Unit,1040,1100,999, this._testValueFunc),
            new InfoCard("Печорская ТЭС","tes",this.CurIndicator.Unit,324,320,292, this._testValueFunc),
            new InfoCard("Северо-Западная ТЭЦ","tec",this.CurIndicator.Unit,889,920,1019, this._testValueFunc),
            new InfoCard("Сочинская ТЭС","tes",this.CurIndicator.Unit,116,110,122, this._testValueFunc),
            new InfoCard("Талаховская ТЭС","tes",this.CurIndicator.Unit,0,550,473, this._testValueFunc),
            new InfoCard("Уренгойская ГРЭС","gres",this.CurIndicator.Unit,528,620,496, this._testValueFunc),
            new InfoCard("Харанорская ГРЭС","gres",this.CurIndicator.Unit,202,300,277, this._testValueFunc),
            new InfoCard("Черепетская ГРЕС","gres",this.CurIndicator.Unit,225,210,235, this._testValueFunc),
            new InfoCard("Южноуральская ГРЭС","gres",this.CurIndicator.Unit,176,180,186, this._testValueFunc),
            new InfoCard("Южноуральская ГРЭС-2","gres",this.CurIndicator.Unit,410,350,389, this._testValueFunc)
        ];
    }

    constructor(){
        this.CurIndicator = this.Indicators[0];
        this.RefreshData();
    }

}