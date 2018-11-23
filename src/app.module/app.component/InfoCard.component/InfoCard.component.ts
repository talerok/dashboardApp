import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfoCard } from "../../../models/InfoCard"


@Component({
    selector: 'info-card',
    templateUrl: './InfoCard.component.html',
    styleUrls: ['./InfoCard.component.less'],
})
export class InfoCardComponent { 
    @Input() public Data : InfoCard = null;

    public GetValueCompareClass(value : number) : string {
        if(this.Data.value < value)
            return "less";
        else if(this.Data.value > value)
            return "more";
        else
            return "fine";
    }

    public GetValueClass() : string{
        return this.Data.valueStateFunc(this.Data);
    }

}