import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent }   from './app.component/app.component';
import {  InfoCardComponent }   from './app.component/InfoCard.component/InfoCard.component';
import { MainDashboard  }   from './app.component/mainDashboard.component/mainDashboard.component';
import { CustomSelect } from './app.component/CustomSelect.component/CustomSelect.component'

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, InfoCardComponent, MainDashboard, CustomSelect ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { } 