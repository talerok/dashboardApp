import { EventEmitter, Injectable } from '@angular/core';
import { ErrorMessage } from '../models/ErrorMessage';
import { ToastrService } from 'ngx-toastr';
import { NotificationMessagesService } from '../services/Abstract/NotificationMessagesService'



@Injectable()
export class ToastrNoticicationService implements NotificationMessagesService {
    public readonly ErrorEvent: EventEmitter<ErrorMessage> = new EventEmitter<ErrorMessage>();
    public readonly NotificationEvent: EventEmitter<ErrorMessage> = new EventEmitter<ErrorMessage>();

    constructor(private _toastr: ToastrService){
        this.ErrorEvent.subscribe((x : ErrorMessage) => {
            this._toastr.error(x.Description, x.Tittle);
        });

        this.NotificationEvent.subscribe((x : ErrorMessage) => {
            this._toastr.info(x.Description, x.Tittle);
        });
    }

}