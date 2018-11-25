import { Component, HostListener, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'datetime-picker',
    templateUrl: './DateTimePicker.component.html',
    styleUrls: ['./DateTimePicker.component.less'],
})
export class DateTimePicker { 
    @Input() Value: Date;
    @Output() ValueChange: EventEmitter<Date> = new EventEmitter<Date>();

    public Date: Date;

    private _isOpen : boolean = false;

    private _convertNumber(value: number) : string{
        return value < 10 ? "0" + value : value.toString();
    }

    private _getTime(value : Date) : string{
        return this._convertNumber(value.getHours()) + ":" + this._convertNumber(value.getMinutes()); 
    }

    private _getDate(value: Date) : string{
        let day : string = this._convertNumber(value.getDate());
        let month : string = this._convertNumber(value.getMonth() + 1);
        return day + "." + month  + "." + value.getFullYear() ;
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