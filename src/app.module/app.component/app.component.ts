import { Component, ViewEncapsulation } from '@angular/core';
import { InfoCard } from "../../models/InfoCard"
import { DataService } from '../../services/Abstract/DataService';
import { RestDateService } from '../../services/RestDataService';
import { ConvertService } from './../../services/ConvertService';
import { ToastrService } from 'ngx-toastr';
import { ErrorMessage } from '../../models/ErrorMessage';
import { NotificationMessagesService } from '../../services/Abstract/NotificationMessagesService';
import { ToastrNoticicationService } from '../../services/ToastrNotificationService';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less', './app.component.icons.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NotificationMessagesService, useClass: ToastrNoticicationService},
        {provide: DataService, useClass: RestDateService},
        ConvertService
    ]
})
export class AppComponent { 

    private _spinnerActive : boolean = false;

    constructor(private _dataSerivce : DataService, private _toastrService: ToastrService){}
}