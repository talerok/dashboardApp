import { Component } from '@angular/core';

@Component({
    selector: 'datetime-picker',
    templateUrl: './DateTimePicker.component.html',
    styleUrls: ['./DateTimePicker.component.less'],
})
export class DateTimePicker { 
    public Date: string = "22.08.2018";
    public Hour: string = "07:00";
    public Icon: string = "icon-calendar";
}