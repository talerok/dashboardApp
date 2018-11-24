import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-wrapper',
    templateUrl: './InputWrapperComponent.html',
    styleUrls: ['./InputWrapperComponent.less'],
})
export class InputWrapper { 
    @Input() Icon : string;
    @Input() Description : string;
    @Input() Additional: string;
    @Input() HasAttachments: boolean;
}