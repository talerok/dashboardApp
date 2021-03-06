import { DataService } from "./Abstract/DataService";
import { Indicator } from "../models/Indicator";
import { Injectable, EventEmitter } from '@angular/core';

import { Station, StationBlock, BaseStationObject, BlockCollection } from "../models/Station";
import { IndicatorValue } from "../models/IndicatorValue";
import { Status } from "../models/Status";
import { Period } from "../models/Period";
import { MultiIndicatorValue } from "../models/MultiIndicatorValue";
import { StateTableRow, StateTable } from "../models/StateTable";
import { StationObjectIndicatorValues } from "../models/StationObjectIndicatorValues"
import { ErrorMessage } from "../models/ErrorMessage"

@Injectable()
export class FakeDataService implements DataService {

    public LoadEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

    private _timeout : number = 500;

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

    private _fakeStationIndicators: Indicator[] = [
        new Indicator("2", "Электрогенерация", "", "lightning", null),
        new Indicator("3", "Топливо",  "", "fuel", null),
        new Indicator("11", "Изменение состава оборудования", "", "repair", null)
    ];

    private _fakeBlocksIndicators: Indicator[] = [
        this._fakeStationIndicators[0],
        this._fakeStationIndicators[1]
    ];

    private _fakeEnergyIndicators : Indicator[] = [
        new Indicator("4", "2", "Установленная тепловая мощность", "МВт", "lightning"),
        new Indicator("5", "2", "Текущая мощность", "МВт", "lightning"),
        new Indicator("6", "2", "Текущая активная мощность", "МВт", "lightning"),
        new Indicator("7", "2", "Удельный расход условного топлива на выработку электроэнергии", "г/кВТ*ч", "lightning"),
        new Indicator("8", "2", "Выработано электроэнергии", "млн. КВт*ч", "lightning"),
        new Indicator("9", "2", "Отпущено электроэнергии с шин", "млн. КВт*ч", "lightning"),
        new Indicator("10", "2","Потребление электроэнергии на собственные нужды", "млн. КВт*ч", "lightning")
    ];

    private _fakeFuelIndicators : Indicator[] = [
        new Indicator("10", "3", "Расход газа", "тыс.м<sup>3</sup>", "fuel"),
        new Indicator("11", "3", "Расход угля", "тонн", "fuel"),
        new Indicator("12", "3", "Расход дизельного топлива", "тонн", "fuel"),
        new Indicator("13", "3", "Расход мазута", "тонн", "fuel"),
        new Indicator("14", "3", "Запас угля", "тыс. тонн", "fuel"),
        new Indicator("15", "3", "Запас дизельного топлива", "тыс. тонн", "fuel"),
        new Indicator("16", "3", "Запас мазута", "тыс. тонн", "fuel")
    ];

    private _fakeIndicators: Indicator[] = this._fakeEnergyIndicators.concat(this._fakeFuelIndicators);

    private _randomBool() : boolean{
        return Math.random() >= 0.5;
    }

    private _fakeStations: Station[] = [
        new Station("0", "Верхнетагильская ГРЭС","gres", this._fakeStationIndicators, 57.357129, 59.955618, this._generateFakeBlocks("0"), true),
        new Station("1", "Гусиноозерская ГРЭС","gres", this._fakeStationIndicators, 51.298905, 106.484128, this._generateFakeBlocks("1"), true),
        new Station("2", "Джубгинская ТЭС","tes", this._fakeStationIndicators, 44.426183, 38.781969, this._generateFakeBlocks("2"), true),
        new Station("3", "Ивановские ПГУ","pgu", this._fakeStationIndicators, 57.025899, 40.377292, this._generateFakeBlocks("3"), true),
        new Station("4", "Ириклинская ГРЭС","gres", this._fakeStationIndicators, 51.753467, 58.807485, this._generateFakeBlocks("4"), true),
        new Station("5", "Калининградская ТЭЦ-2","tec", this._fakeStationIndicators, 54.663006, 20.578134, this._generateFakeBlocks("5"), true),
        new Station("6", "Каширская ГРЭС","gres", this._fakeStationIndicators, 54.855943, 38.252840, this._generateFakeBlocks("6"), true),
        new Station("7", "Костромская ГРЭС","gres", this._fakeStationIndicators, 57.459501, 41.174551, this._generateFakeBlocks("7"), true),
        new Station("8", "Маяковская ТЭС","tes", this._fakeStationIndicators, 54.568520, 22.177649, this._generateFakeBlocks("8"), true),
        new Station("9", "Нижневартовкая ГРЭС","gres", this._fakeStationIndicators, 60.956604, 76.885784, this._generateFakeBlocks("9"), true),
        new Station("10", "Пермская ГРЭС","gres", this._fakeStationIndicators, 58.493975, 56.352177, this._generateFakeBlocks("10"), true),
        new Station("11", "Прегольская ТЭС","tes", this._fakeStationIndicators, 54.709989, 20.479101, this._generateFakeBlocks("11"), true),
        new Station("12", "Печорская ГРЭС","gres", this._fakeStationIndicators, 57.821777, 27.603664, this._generateFakeBlocks("12"), true),
        new Station("13", "Северо-Западная ТЭЦ","tec", this._fakeStationIndicators, 60.016742, 30.099479, this._generateFakeBlocks("13"), true),
        new Station("14", "Сочинская ТЭС","tes", this._fakeStationIndicators, 43.594350, 39.754063, this._generateFakeBlocks("14"), true),
        new Station("15", "Талаховская ТЭС","tes", this._fakeStationIndicators, 55.094389, 21.801083, this._generateFakeBlocks("15"), true),
        new Station("16", "Уренгойская ГРЭС","gres", this._fakeStationIndicators, 66.032602, 78.078134, this._generateFakeBlocks("16"), true),
        new Station("17", "Харанорская ГРЭС","gres", this._fakeStationIndicators, 50.853437, 115.700195, this._generateFakeBlocks("17"), true),
        new Station("18", "Черепетская ГРЭС","gres", this._fakeStationIndicators, 54.135232, 36.473949, this._generateFakeBlocks("18"), true),
        new Station("19", "Южноуральская ГРЭС","gres", this._fakeStationIndicators, 54.451273, 61.256371, this._generateFakeBlocks("19"), true),
        new Station("20", "Южноуральская ГРЭС-2","gres", this._fakeStationIndicators, 54.466615, 61.204141, this._generateFakeBlocks("20"), true)
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
        return res;
    }


    public async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>{
        return this._timeOutPromise<IndicatorValue<Station>[]>(this._fakeStations.map((x) => {
            let plan = this._randomValue();
            let prev = this._randomValue();
            let value = this._randomValue();
            let status : Status = value === 0 ? Status.Bad : (plan * 0.9 > value ? Status.Good : Status.Fine);
            return new IndicatorValue<Station>(plan,prev, value, status, false, x);
        }), this._timeout);
    }

    private _generateFakeBlocks(stationId: string){
        let count = Math.floor(Math.random() * 6) + 2;
        let res: StationBlock[] = [];
        for(let i = 0; i < count; i++)
            res.push(new StationBlock(i.toString(), stationId, "Блок №: " + (i + 1), this._fakeBlocksIndicators, this._randomBool()));    
        return res;
    }

    private _generateFakeTableData(object: BaseStationObject) : StateTable{
        let blocks: StationBlock[];
        if(object instanceof Station)
            blocks = object.Blocks;
        else if(object instanceof BlockCollection)
            blocks = object.Blocks;
        else
            return new StateTable([]);

        let res: StateTableRow[] = [];
        let count = Math.floor(Math.random() * 100) + 30;
        let blocksCount = blocks.length;
        let now = Date.now();
        for(let i = 0; i < count; i++)
            res.push(new StateTableRow(new Date(now + 43200000 * i), blocks[i % blocksCount], "Тестовый коментарий № " + i,  i % 2 === 0))
        return new StateTable(res);
    }

    private _generateFakeStationObjectIndicatorValues(indicators: Indicator[]) : StationObjectIndicatorValues{
        let res = indicators.map((x) => {
            let plan = this._randomValue();
            let prev = this._randomValue();
            let value = this._randomValue();
            let status : Status = value === 0 ? Status.Bad : (plan * 0.9 > value ? Status.Good : Status.Fine);
            return new IndicatorValue<Indicator>(plan,prev, value, status, false, x);
       });
       return new StationObjectIndicatorValues(res);
    }

    public async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date, period: Period):  Promise<any> {

        if(indicator === this._fakeStationIndicators[2] && (object instanceof Station || object instanceof BlockCollection))
            return this._timeOutPromise<StateTable>(this._generateFakeTableData(object), this._timeout);
        
        let indicators : Indicator[];
        if(indicator === this._fakeStationIndicators[0])
            indicators = this._fakeEnergyIndicators;
        else 
            indicators = this._fakeFuelIndicators;

        return this._timeOutPromise<StationObjectIndicatorValues>(
            this._generateFakeStationObjectIndicatorValues(indicators)
            , this._timeout);
    }

    public async GetStations() : Promise<Station[]> {
        return this._timeOutPromise<Station[]>(this._fakeStations, this._timeout);
    }

    private _generateFakeMultiIndicatorValue(period: Period): MultiIndicatorValue {
        let count = period === Period.Day ? 24 : (period === Period.Month ? 30 : 12);

        let labels: string[] = [];
        let plan: number[] = [];
        let prev: number[] = [];
        let value: number[] = [];

        for(let i = 0; i < count; i++){
            labels.push(i.toString());
            plan.push(this._randomValue());
            prev.push(this._randomValue());
            value.push(this._randomValue());
        }
        return new MultiIndicatorValue(plan,prev,value,labels);
    }

    public async GetDataFromPeriod(object: BaseStationObject, indicator: Indicator, date: Date, period: Period) : Promise<MultiIndicatorValue>{
        return this._timeOutPromise<MultiIndicatorValue>(
        this._generateFakeMultiIndicatorValue(period)
        , this._timeout)
    }

    public async GetBlockCollection(blocks: StationBlock[]) : Promise<BlockCollection> {
        return this._timeOutPromise<BlockCollection>(
            new BlockCollection(blocks, this._fakeStationIndicators),
            this._timeout
        )
    }

}