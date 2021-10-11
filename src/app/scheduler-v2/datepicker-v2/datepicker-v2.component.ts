import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbCalendar, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-datepicker-v2',
  templateUrl: './datepicker-v2.component.html',
  styleUrls: ['./datepicker-v2.component.scss']
})
export class DatepickerV2Component implements OnInit {

  @Output() sendDay = new EventEmitter<any>()
  day!:any

  constructor(private calendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {
  }

  ngOnInit(): void {
  }

  model = this.calendar.getToday()
  date: {year: number, month: number};


  getDay(something){
    this.sendDay.emit(something)
  }

}
