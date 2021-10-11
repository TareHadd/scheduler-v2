import { Component, OnInit } from '@angular/core';
import { Node } from '../models/thedata'
import { addDays, eachDayOfInterval, endOfWeek, format, startOfWeek, subDays } from 'date-fns';
import { AppointmentsService } from '../services/appointments.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-scheduler-v2',
  templateUrl: './scheduler-v2.component.html',
  styleUrls: ['./scheduler-v2.component.scss'],
})
export class SchedulerV2Component implements OnInit {
  date = new Date();
  startOfWeek!: any;
  endOfWeek!: any;
  hours: any[] = [];
  // Starting point
  array: Node[] = [];
  weekdays;
  data = [];
  status = false;
  bookedHours = [];

  nodeData = [];
  numberOfAppointments;

  // used to get next appointment in modal
  futureAppointments = [];
  index = 0;
  rightArrowStatus = true;
  leftArrowStatus = true;
  indexx!: number;

  constructor(
    private service: AppointmentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.logic();
    this.getOnlyHours();
  }

  nextWeek() {
    this.date = addDays(this.date, 7);
    this.data = [];
    this.logic();
  }

  previousWeek() {
    this.date = subDays(this.date, 7);
    this.data = [];
    this.logic();
  }

  formatData(date) {
    this.startOfWeek = startOfWeek(date);
    this.endOfWeek = endOfWeek(date);
    let hour!: any;
    let hours = [];
    let appointment = [];

    this.weekdays = eachDayOfInterval({
      start: this.startOfWeek,
      end: this.endOfWeek,
    });

    // getting week

    for (let i = 8; i <= 20; i++) {
      if (i < 10) {
        hour = '0' + i + ':00';
      }
      if (i >= 10) {
        hour = i + ':00';
      }
      hours.push(hour);
    }

    // getting hours

    // Making weekday object
    for (let day of this.weekdays) {
      let weekdays = {
        day: day,
        hours: hours,
        appointments: [],
        bookedHours: [],
      };

      this.data.push(weekdays);
    }
  }

  getOnlyHours() {
    let hour;
    for (let i = 8; i <= 20; i++) {
      if (i < 10) {
        hour = '0' + i + ':00';
      }
      if (i >= 10) {
        hour = i + ':00';
      }
      this.hours.push(hour);
    }
  }

  logic() {
    this.service.getData().subscribe((res) => {
      this.nodeData = res;

      this.formatData(this.date);
      for (let d of this.data) {
        d.day = formatDate(new Date(d.day), 'Y-MM-dd', 'en');
        for (let hour of d.hours) {
          res.filter((t) => {
            let tdate = t.date.substring(0, 10);
            let hours = formatDate(t.date, 'HH:mm', 'en');
            // console.log(tdate + ' ' + hours + ' all: ' + d.day + ' ' + hour)
            if (tdate === d.day && hours === hour) {
              let obj = {
                t,
                hour,
              };

              d.appointments.push(obj);
              d.bookedHours.push(hour);
              d.bookedHours = [...new Set(d.bookedHours)];
              this.status = true;
            }
          });
        }
      }

      console.log(this.data);
      this.allAppointments();

      // for(let d of this.data){
      //   // console.log(d)
      //   console.log(d.bookedHours.size)

      // }
    });
  }

  // Used to show week on big calendar if date is picked on small ones
  getDay(date) {
    let year = date.year;
    let month = date.month;
    let day = date.day;

    this.date = new Date(year, month - 1, day);
    this.data = [];
    this.logic();
  }

  // modal open f
  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  // Used to open modal with given data
  select(data, hour, content) {
    /*After we open modal, automatically we get id of appointment in 
                                    futurea appointments array*/

    this.nodeData = [];

    for (let d of data) {
      if (d.hour === hour) {
        this.nodeData.push(d);
      }
    }

    this.modalService.open(content);
    this.index = 0;

    for (let fa of this.futureAppointments) {
      if (fa === data) {
        console.log(fa);
        console.log(data);
        this.indexx = this.futureAppointments.indexOf(data);

        if (this.indexx >= this.futureAppointments.length - 1) {
          // Conditions to enable or disable arrows in modal
          this.rightArrowStatus = false; // Conditions to enable or disable arrows in modal
        } else {
          this.rightArrowStatus = true;
        }

        if (this.indexx <= 0) {
          // Conditions to enable or disable arrows in modal
          this.leftArrowStatus = false;
        } else {
          // Conditions to enable or disable arrows in modal
          this.leftArrowStatus = true;
        }
      }
    }
  }

  // Used to show how much of appointments is in given hour
  count(data, hour) {
    let i = 0;
    this.numberOfAppointments = '';
    for (let d of data) {
      if (d.hour === hour) {
        i++;
      }
    }

    this.numberOfAppointments = i;
    return i;
  }

  allAppointments() {
    if (this.data) {
      this.futureAppointments = [];
      for (let d of this.data) {
        if (d.appointments.length > 0) {
          this.futureAppointments.push(d.appointments);
        }
      }
    }
  }

  // We get index when we open one news and arrows switch on next or previous
  nextAppointments(data) {

    this.nodeData = [];

    if (this.indexx >= this.futureAppointments.length - 1) {
      //Logic for switching appointments on arrows
      return;
    } else {
      this.indexx++;
      this.rightArrowStatus = true;
    }

    if (this.indexx > 0) {
      //Logic for showing left arrow
      this.leftArrowStatus = true;
    }

    console.log(this.indexx);
    for (let fa of this.futureAppointments[this.indexx]) {
      // console.log(fa)
      this.nodeData.push(fa);
    }

    if (this.indexx == this.futureAppointments.length - 1) {
      this.rightArrowStatus = false;
    }
  }

  previousAppointments() {
    this.nodeData = [];

    this.indexx--; //Logic for switching appointments back in modal
    if (this.indexx <= 0) {
      this.leftArrowStatus = false;
    }

    if (this.indexx >= 0) {
      //Logic for showing rigth arrow again
      this.rightArrowStatus = true;
    }

    for (let fa of this.futureAppointments[this.indexx]) {
      this.nodeData.push(fa);
    }
  }

}
