import { DataService } from "./Abstract/DataService";
import { Indicator } from "../models/Indicator";
import { InfoCard } from "../models/InfoCard";
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FakeDateService implements DataService {

    public LoadEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

    private _timeout : number = 1000;

    private _loadCount : number = 0;

    private _initLoading() : void{
        this._loadCount++;
        if(this._loadCount === 1)
            this.LoadEvent.emit(true);
    }

    private _stopLoading() : void {
        this._loadCount--;
        if(this._loadCount === 0)
            this.LoadEvent.emit(false);
    }

    public async GetAllStationIndicators() :  Promise<Indicator[]>{
        this._initLoading();
        return new Promise<Indicator[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    new Indicator("Текущая мощность", "мВт", "energy"),
                    new Indicator("Отпущено тепла с коллекторов",  "тыс. Гкал", "fuel")
                ]);
            }, this._timeout);
        }).then((x) => {
            this._stopLoading();
            return x;
        });
    } 

    private _randomValue() : number{
        var res = Math.floor(Math.random() * 1300);
        return res > 300 ? res : 0;
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

        return new Promise<InfoCard[]>((resolve, reject) => {
            this._initLoading();
            setTimeout(() => {
                resolve(
                [
                    new InfoCard("Верхнетагильская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Гусиноозерская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Дхубгинская ТЭС","tes",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Ивановские ПГУ","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Ириклинская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Калининградская ТЭЦ-2","tec",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Каширская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Кастромская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Маяковская ТЭС","tes",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Нижневартовкая ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Пермская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Перегольская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Печорская ТЭС","tes",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Северо-Западная ТЭЦ","tec",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Сочинская ТЭС","tes",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Талаховская ТЭС","tes",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Уренгойская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Харанорская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Черепетская ГРЕС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Южноуральская ГРЭС","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc),
                    new InfoCard("Южноуральская ГРЭС-2","gres",indicator,this._randomValue(),this._randomValue(),this._randomValue(), this._fakeValueFunc)
                ]);
            }, this._timeout);
        }).then((x) => {
            this._stopLoading();
            return x;
        });
    }

}