import { Component } from '@angular/core';
import { InfoCard } from "../../models/InfoCard"
import { DataService } from '../../services/Abstract/DataService';
import { FakeDateService } from '../../services/FakeDataService';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        {provide: DataService, useClass: FakeDateService}
    ]
})
export class AppComponent { 

}