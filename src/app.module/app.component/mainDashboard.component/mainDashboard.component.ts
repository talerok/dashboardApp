import { Component } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"

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

    public Cards : InfoCard[] = [
        new InfoCard("Верхнетагильская ГРЭС","gres","mvt",707,920,655, this._testValueFunc),
        new InfoCard("Гусиноозерская ГРЭС","gres","mvt",527,510,496, this._testValueFunc),
        new InfoCard("Дхубгинская ТЭС","tes","mvt",99,90,105, this._testValueFunc),
        new InfoCard("Ивановские ПГУ","gres","mvt",0,350,288, this._testValueFunc),
        new InfoCard("Ириклинская ГРЭС","gres","mvt",1186,1200,1182, this._testValueFunc),
        new InfoCard("Калининградская ТЭЦ-2","tec","mvt",621,610,573, this._testValueFunc),
        new InfoCard("Каширская ГРЭС","gres","mvt",349,420,325, this._testValueFunc),
        new InfoCard("Кастромская ГРЭС","gres","mvt",2984,2950,2998, this._testValueFunc),
        new InfoCard("Маяковская ТЭС","tes","mvt",150,180,172, this._testValueFunc),
        new InfoCard("Нижневартовкая ГРЭС","gres","mvt",1983,1960,1724, this._testValueFunc),
        new InfoCard("Пермская ГРЭС","gres","mvt",1040,1120,1037, this._testValueFunc),
        new InfoCard("Перегольская ГРЭС","gres","mvt",1040,1100,999, this._testValueFunc),
        new InfoCard("Печорская ТЭС","tes","mvt",324,320,292, this._testValueFunc),
        new InfoCard("Северо-Западная ТЭЦ","tec","mvt",889,920,1019, this._testValueFunc),
        new InfoCard("Сочинская ТЭС","tes","mvt",116,110,122, this._testValueFunc),
        new InfoCard("Талаховская ТЭС","tes","mvt",0,550,473, this._testValueFunc),
        new InfoCard("Уренгойская ГРЭС","gres","mvt",528,620,496, this._testValueFunc),
        new InfoCard("Харанорская ГРЭС","gres","mvt",202,300,277, this._testValueFunc),
        new InfoCard("Черепетская ГРЕС","gres","mvt",225,210,235, this._testValueFunc),
        new InfoCard("Южноуральская ГРЭС","gres","mvt",176,180,186, this._testValueFunc),
        new InfoCard("Южноуральская ГРЭС-2","gres","mvt",410,350,389, this._testValueFunc)
    ];
}