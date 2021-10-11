import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FormsModule } from '@angular/forms';
import { DateTimePipe } from './pipe/dateTimePipe';
import { SchedulerV2Component } from './scheduler-v2/scheduler-v2.component';
import { DatepickerV2Component } from './scheduler-v2/datepicker-v2/datepicker-v2.component';
import { NextViewingComponent } from './scheduler-v2/next-viewing/next-viewing.component';



@NgModule({
  declarations: [
    AppComponent,
    DateTimePipe,
    SchedulerV2Component,
    DatepickerV2Component,
    NextViewingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
