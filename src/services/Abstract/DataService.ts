import { Indicator } from "../../models/Indicator";
import { Injectable, EventEmitter } from '@angular/core';
import { IndicatorValue } from "../../models/IndicatorValue";
import { Station, BaseStationObject } from '../../models/Station'

@Injectable()
export abstract class DataService{
    abstract async GetAllStationIndicators() :  Promise<Indicator[]>; 
    abstract async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<IndicatorValue<Station>[]>; 
    abstract async GetStations() : Promise<Station[]>;
    abstract async GetStationObjectData(object: BaseStationObject, indicator: Indicator, date: Date):  Promise<IndicatorValue<Indicator>[]>;

    abstract LoadEvent : EventEmitter<boolean>;
}