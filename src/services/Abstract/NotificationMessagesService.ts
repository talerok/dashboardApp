import { EventEmitter } from '@angular/core';
import { ErrorMessage } from '../../models/ErrorMessage';

export abstract class NotificationMessagesService{
    abstract readonly ErrorEvent: EventEmitter<ErrorMessage>;
    abstract readonly NotificationEvent: EventEmitter<ErrorMessage>;
}