import { Indicator } from "../../models/Indicator";
import { InfoCard } from "../../models/InfoCard";
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export abstract class DataService{
    abstract async GetAllStationIndicators() :  Promise<Indicator[]>; 
    abstract async GetAllStationsData(indicator : Indicator, date: Date) :  Promise<InfoCard[]>; 
    abstract LoadEvent : EventEmitter<boolean>;
}