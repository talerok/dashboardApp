import { DataService } from "./Abstract/DataService";
import { Indicator } from "../models/Indicator";
import { InfoCard } from "../models/InfoCard";
import { Unit } from "../models/unit";
import { Injectable } from '@angular/core';

@Injectable()
export class FakeDateService implements DataService {

    public async GetAllStationIndicators() :  Promise<Indicator[]>{
        return new Promise<Indicator[]>((resolve, reject) => {
            resolve([
                new Indicator("Текущая мощность",  new Unit("мВт","mvt")),
                new Indicator("Текущий расход топлива",  new Unit("тыс. тонн","tt"))
            ]);
        });
    } 

    private _randomValue() : number{
        return Math.floor(Math.random() * 1300);
    }

    private _fakeValueFunc(info: InfoCard) : string{
        var coef = info.value / info.planValue;
        if(coef > 0.9)
            return "good";
        else if(coef > 0)
            return "fine"
        else
            return "bad"
    }

    public async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<InfoCard[]>{
        console.log(indicator);
        return new Promise<InfoCard[]>((resolve, reject) => {
            resolve(
            [
                new InfoCard("Верхнетагильская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Гусиноозерская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Дхубгинская ТЭС","tes",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Ивановские ПГУ","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Ириклинская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Калининградская ТЭЦ-2","tec",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Каширская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Кастромская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Маяковская ТЭС","tes",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Нижневартовкая ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Пермская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Перегольская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Печорская ТЭС","tes",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Северо-Западная ТЭЦ","tec",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Сочинская ТЭС","tes",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Талаховская ТЭС","tes",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Уренгойская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Харанорская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Черепетская ГРЕС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Южноуральская ГРЭС","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                new InfoCard("Южноуральская ГРЭС-2","gres",indicator.Unit,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc)
            ]);
        });
    }

}