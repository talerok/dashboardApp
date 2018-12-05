import { Component, ViewEncapsulation, HostListener, ElementRef, Input, Output, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';
import { Period } from '../../../models/Period';
import { MatCalendar, MatCalendarHeader } from '@angular/material';

@Component({
    selector: 'datetime-picker',
    templateUrl: './DateTimePicker.component.html',
    styleUrls: ['./DateTimePicker.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DateTimePicker { 
    @Input() Value: Date;
    @Input() Type: Period = Period.Day;
    @Output() ValueChange: EventEmitter<Date> = new EventEmitter<Date>();

    @ViewChild(MatCalendar)private _calendar: MatCalendar<any>;
    @ViewChild(MatCalendarHeader)private _calendarHeader: MatCalendarHeader<any>;

    public Date: Date;

    private _activeDate: Date;
    private _isOpen : boolean = false;

    private _datePickerMode: string = 'day';

    private _goToNextDateView(){
        this._activeDate = this.Date;
        switch(this.Type){
            case Period.Day:
                if(this._datePickerMode === 'year')
                    this._datePickerMode = 'month';
                else if(this._datePickerMode === 'month')
                    this._datePickerMode = 'day';
                break;
             case Period.Month:
                if(this._datePickerMode === 'year')
                    this._datePickerMode = 'month';
                break;
             case Period.Year:
                break;
        }
    }

    private _goToPrevDateView(){
        switch(this.Type){
            case Period.Day:
                if(this._datePickerMode === 'year')
                    this._datePickerMode = 'day';
                else if(this._datePickerMode === 'month')
                    this._datePickerMode = 'year';
                else if(this._datePickerMode == 'day')
                    this._datePickerMode = 'month';
                break;
             case Period.Month:
                if(this._datePickerMode === 'year')
                    this._datePickerMode = 'month';
                else if(this._datePickerMode === 'month')
                    this._datePickerMode = 'year';
                break;
             case Period.Year:
                break;
        }
    }

    private _nextDatePeriodView(){
        let ms = this._activeDate.getTime();
        switch(this._datePickerMode){
            case 'day':
                this._activeDate = new Date(ms + 2592000000)
                break;
             case 'month':
                this._activeDate = new Date(ms + 31536000000);
                break;
             case 'year':
                this._activeDate = new Date(ms + 788400000000);
                break;
        }
    }

    private _prevDatePeriodView(){
        let ms = this._activeDate.getTime();
        switch(this._datePickerMode){
            case 'day':
                this._activeDate = new Date(ms - 2592000000)
                break;
             case 'month':
                this._activeDate = new Date(ms - 31536000000);
                break;
             case 'year':
                this._activeDate = new Date(ms - 788400000000);
                break;
        }
    }

    private _convertNumber(value: number) : string{
        return value < 10 ? "0" + value : value.toString();
    }

    private _getTime(value : Date) : string{
        if(this.Type === Period.Day)
            return this._convertNumber(value.getHours()) + ":" + this._convertNumber(value.getMinutes()); 
        else
            return "";
    }

    private _getDate(value: Date) : string{
        let day : string = this._convertNumber(value.getDate());
        let month : string = this._convertNumber(value.getMonth() + 1);

        switch(this.Type){
            case Period.Day:
                return day + "." + month  + "." + value.getFullYear();
            case Period.Month:
                return month  + "." + value.getFullYear();
            case Period.Year:
                return value.getFullYear().toString();
        }
        return "";
    }

    private _getMinutes(value: Date){
        return this._convertNumber(value.getMinutes())
    }

    private _getHours(value: Date){
        return this._convertNumber(value.getHours());
    }


    private _increaseHour() : void{
        var ms = this.Date.getTime() + 3600000;
        this.Date = new Date(ms);
    }

    private _decreaseHour() : void{
        var ms = this.Date.getTime() - 3600000;
        this.Date = new Date(ms);
    }

    private _decreaseMinute() : void{
        var ms = this.Date.getTime() - 60000;
        this.Date = new Date(ms);
    }

    private _increaseMinute() : void{
        var ms = this.Date.getTime() + 60000;
        this.Date = new Date(ms);
    }

    private _save() : void{
        this._isOpen = false;
        this.Value = this.Date;
        this.ValueChange.emit(this.Value);
    }

    constructor(private _elementRef : ElementRef) {}

    ngOnChanges(changes: SimpleChanges) {
        this.Date = this.Value;
        this._setStartDateView();
    }

    private _setStartDateView(){
        this._activeDate = this.Date;
        switch(this.Type){
            case Period.Day:
                this._datePickerMode = 'day';
                break;
             case Period.Month:
                this._datePickerMode = 'month';
                break;
             case Period.Year:
                this._datePickerMode = 'year';
                break;
        }
    }

    private _titleClick(){
        if(!this._isOpen)
            this._setStartDateView();
        this._isOpen = !this._isOpen;
    }

    @HostListener('document:mousedown', ['$event.target'])
    public onClick(targetElement : any) {
        if(this._isOpen){
            const clickedInside = this._elementRef.nativeElement.contains(targetElement.parentNode);
            if (!clickedInside) {
                this._isOpen = false;
            }
        }
    }

}