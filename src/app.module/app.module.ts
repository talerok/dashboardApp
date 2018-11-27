import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent }   from './app.component/app.component';
import {  InfoCardComponent }   from './app.component/InfoCard.component/InfoCard.component';
import { MainDashboard  }   from './app.component/mainDashboard.component/mainDashboard.component';
import { StationDashboard  }   from './app.component/StationDashboard.component/StationDashboard.component';
import { StationDashboardData } from './app.component/StationDashboard.component/StationDashboardData.component/StationDashboardData.component'

import { ChartComponent } from './app.component/Chart.component/Chart.component'
import { InputWrapper } from './app.component/InputWrapperComponent/InputWrapperComponent'
import { CustomSelect } from './app.component/CustomSelect.component/CustomSelect.component'
import { DateTimePicker } from './app.component/DateTimePicker.component/DateTimePicker.component'
import { MaterialModule } from './material.module'

import {Routes, RouterModule, } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes =[
    { path: '', component: MainDashboard},
    { path: 'station/:id', component: StationDashboard },
    { path: 'station', component: StationDashboard }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, MaterialModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent, InfoCardComponent, MainDashboard, StationDashboard, StationDashboardData, CustomSelect, InputWrapper, DateTimePicker, ChartComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru-RU'},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
})
export class AppModule { } 