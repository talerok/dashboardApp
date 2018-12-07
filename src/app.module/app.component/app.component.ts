import { Component, ViewEncapsulation } from '@angular/core';
import { InfoCard } from "../../models/InfoCard"
import { DataService } from '../../services/Abstract/DataService';
import { SemiFakeDateService } from '../../services/SemiFakeDataService';
import { ConvertService } from './../../services/ConvertService';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: DataService, useClass: SemiFakeDateService},
        ConvertService
    ]
})
export class AppComponent { 

    private _spinnerActive : boolean = false;

    constructor(private _dataSerivce : DataService){
        _dataSerivce.LoadEvent.subscribe((x : boolean) => {
            setTimeout(() => {
                this._spinnerActive = x;
            }, 0);
        });
    }
}