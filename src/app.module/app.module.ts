import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent }   from './app.component/app.component';
import {  InfoCardComponent }   from './app.component/InfoCard.component/InfoCard.component';
import { MainDashboard  }   from './app.component/mainDashboard.component/mainDashboard.component';
import { InputWrapper } from './app.component/InputWrapperComponent/InputWrapperComponent'
import { CustomSelect } from './app.component/CustomSelect.component/CustomSelect.component'
import { DateTimePicker } from './app.component/DateTimePicker.component/DateTimePicker.component'
import { MaterialModule } from './material.module'


@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, MaterialModule],
    declarations: [ AppComponent, InfoCardComponent, MainDashboard, CustomSelect, InputWrapper, DateTimePicker ],
    bootstrap:    [ AppComponent ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru-RU'},
      ],
})
export class AppModule { } 