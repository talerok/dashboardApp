import { Component, Input, Output, HostListener, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CustomSelectOption } from '../../../models/CustomSelectOption'

@Component({
    selector: 'custom-select',
    templateUrl: './CustomSelect.component.html',
    styleUrls: ['./CustomSelect.component.less'],
})
export class CustomSelect { 
    @Input() Value : any;
    @Output() ValueChange = new EventEmitter<any>();

    @Input() Options : CustomSelectOption[]; 

    private _isOpen : boolean;
    private _selectedOption : CustomSelect;


    public _selectClick = function(){
        this._isOpen = !this._isOpen;
    }

    public _optionSelected(event : any, option : CustomSelectOption){
        event.stopPropagation();
        this._isOpen = false;
        if(this.Value !== option.Value){
            this.Value = option.Value;
            this.ValueChange.emit(this.Value);
        }
    }

    private _setSelectedOption = function(){
        if(this.Options)
            this._selectedOption = this.Options.find((x : CustomSelectOption) => x.Value === this.Value);
    }

    constructor(private _elementRef : ElementRef) {
        this._setSelectedOption();
    }

    ngOnChanges(changes: SimpleChanges) {
        this._setSelectedOption();
        console.log(this.Value);
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement : any) {
        if(this._isOpen){
            const clickedInside = this._elementRef.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this._isOpen = false;
            }
        }
    }

}