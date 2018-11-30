import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"


@Component({
    selector: 'info-card',
    templateUrl: './InfoCard.component.html',
    styleUrls: ['./InfoCard.component.less'],
})
export class InfoCardComponent { 
    @Input() public Data : InfoCard<any> = null;
    @Input() public AltStyle : string = '';

    public GetValueCompareClass(value : number) : string {
        if(this.Data.indicatorValue.Value < value)
            return "less";
        else if(this.Data.indicatorValue.Value > value)
            return "more";
        else
            return "fine";
    }

}