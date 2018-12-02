import { Indicator } from "../../models/Indicator";
import { Injectable, EventEmitter } from '@angular/core';
import { IndicatorValue } from "../../models/IndicatorValue";
import { Station, BaseStationObject, BlockCollection, StationBlock } from '../../models/Station'
import { Period } from "../../models/Period";
import { MultiIndicatorValue } from "../../models/MultiIndicatorValue";

@Injectable()
export abstract class DataService{
    abstract async GetAllStationIndicators() :  Promise<Indicator[]>; 
    abstract async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>; 
    abstract async GetStations() : Promise<Station[]>;
    abstract async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date):  Promise<IndicatorValue<Indicator>[]>;
    abstract async GetDataFromPeriod(object: BaseStationObject, indicator: Indicator, date: Date, period: Period) : Promise<MultiIndicatorValue>;
    abstract async GetBlockCollection(blocks: StationBlock[]) : Promise<BlockCollection>;

    abstract LoadEvent : EventEmitter<boolean>;
}