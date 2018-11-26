import { DataService } from "./Abstract/DataService";
import { Indicator } from "../models/Indicator";
import { Injectable, EventEmitter } from '@angular/core';

import { Station, StationBlock, BaseStationObject } from "../models/Station";
import { IndicatorValue } from "../models/IndicatorValue";
import { Status } from "../models/Status";

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

    //

    private _fakeStationIndicators: Indicator[] = [
        new Indicator("2", "Генерация/Электрогенерация", "", "energy"),
        new Indicator("3", "Топливо",  "", "fuel")
    ];

    private _fakeEnergyIndicators : Indicator[] = [
        new Indicator("4", "Установленная тепловая мощность", "МВт", "energy"),
        new Indicator("5", "Текущая мощность", "МВт", "energy"),
        new Indicator("6", "Текущая активная мощность", "МВт", "energy"),
        new Indicator("7", "Удельный расход условного топлива на выработку электроэнергии", "г/кВТ*ч", "energy"),
        new Indicator("8", "Вырабатоно электроэнергии", "млн. КВт*ч", "energy"),
        new Indicator("9", "Отпущенно электроэнергии с шин", "млн. КВт*ч", "energy"),
        new Indicator("10", "Потребление электроэнергии на собственные нужды", "млн. КВт*ч", "energy")
    ];

    private _fakeFuelIndicators : Indicator[] = [
        new Indicator("10", "Расход газа", "тыс.м<sup>3</sup>", "fuel"),
        new Indicator("11", "Расход угля", "тонн", "fuel"),
        new Indicator("12", "Расход дизельного топлива", "тонн", "fuel"),
        new Indicator("13", "Расход мазута", "тонн", "fuel"),
        new Indicator("14", "Запас угля", "тыс. тонн", "fuel"),
        new Indicator("15", "Запас дизельного топлива", "тыс. тонн", "fuel"),
        new Indicator("16", "Запас мазута", "тыс. тонн", "fuel")
    ];

    private _fakeIndicators: Indicator[] = this._fakeEnergyIndicators.concat(this._fakeFuelIndicators);

    private _fakeStations: Station[] = [
        new Station("0", "Верхнетагильская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("0")),
        new Station("1", "Гусиноозерская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("1")),
        new Station("2", "Дхубгинская ТЭС","tes", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("2")),
        new Station("3", "Ивановские ПГУ","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("3")),
        new Station("4", "Ириклинская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("4")),
        new Station("5", "Калининградская ТЭЦ-2","tec", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("5")),
        new Station("6", "Каширская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("6")),
        new Station("7", "Кастромская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("7")),
        new Station("8", "Маяковская ТЭС","tes", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("8")),
        new Station("9", "Нижневартовкая ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("9")),
        new Station("10", "Пермская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("10")),
        new Station("11", "Перегольская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("11")),
        new Station("12", "Печорская ТЭС","tes", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("12")),
        new Station("13", "Северо-Западная ТЭЦ","tec", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("13")),
        new Station("14", "Сочинская ТЭС","tes", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("14")),
        new Station("15", "Талаховская ТЭС","tes", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("15")),
        new Station("16", "Уренгойская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("16")),
        new Station("17", "Харанорская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("17")),
        new Station("18", "Черепетская ГРЕС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("18")),
        new Station("19", "Южноуральская ГРЭС","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("19")),
        new Station("20", "Южноуральская ГРЭС-2","gres", this._fakeStationIndicators, 0, 0, this._generateFakeBlocks("20"))
    ];

    private _timeOutPromise<T>(data: T, timeout: number) : Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._initLoading();
            setTimeout(() => {
                resolve(data);
            }, timeout);
        }).then((x) => {
            this._stopLoading();
            return x;
        });
    }

    public async GetAllStationIndicators() :  Promise<Indicator[]>{
        return this._timeOutPromise<Indicator[]>(this._fakeIndicators, this._timeout);
    } 

    private _randomValue() : number{
        let res = Math.floor(Math.random() * 1300);
        return res > 300 ? res : 0;
    }


    public async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>{
        return this._timeOutPromise<IndicatorValue<Station>[]>(this._fakeStations.map((x) => {
            let plan = this._randomValue();
            let prev = this._randomValue();
            let value = this._randomValue();
            let status : Status = value === 0 ? Status.Bad : (plan * 0.9 > value ? Status.Good : Status.Fine);
            return new IndicatorValue<Station>(plan,prev, value, status, x);
        }), this._timeout);
    }

    private _generateFakeBlocks(stationId: string){
        let count = Math.floor(Math.random() * 6) + 2;
        let res: StationBlock[] = [];
        for(let i = 0; i < count; i++)
            res.push(new StationBlock(i.toString(), stationId, "Блок №: " + (i + 1), this._fakeStationIndicators));    
        return res;
    }


    public async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date):  Promise<IndicatorValue<Indicator>[]> {
        let indicators : Indicator[];
        if(indicator === this._fakeStationIndicators[0])
            indicators = this._fakeEnergyIndicators;
        else
            indicators = this._fakeFuelIndicators;

        return this._timeOutPromise<IndicatorValue<Indicator>[]>(
           indicators.map((x) => {
                let plan = this._randomValue();
                let prev = this._randomValue();
                let value = this._randomValue();
                let status : Status = value === 0 ? Status.Bad : (plan * 0.9 > value ? Status.Good : Status.Fine);
                return new IndicatorValue<Indicator>(plan,prev, value, status, x);
           }), this._timeout);
    }

    public async GetStations() : Promise<Station[]> {
        return this._timeOutPromise<Station[]>(this._fakeStations, this._timeout);
    }


}