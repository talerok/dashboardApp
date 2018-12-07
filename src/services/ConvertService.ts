import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ConvertService{

    //ISO 8601 without mils.
    NavigationDateString(date: Date): string{
        return date.toISOString().split('.')[0]+"Z";
    }

}