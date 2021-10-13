import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { Node } from '../core/models/thedata'
import { addDays, eachDayOfInterval, endOfWeek, format, isThursday, startOfWeek, subDays } from 'date-fns';
import { AppointmentsService } from '../core/services/appointments.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import {formatDate} from '@angular/common'
import { FormatService } from '../core/services/format.service';

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
  rightArrowStatus = true;
  leftArrowStatus = true;
 

  newValue
  groupedAppointments
  gaArray = []
  singleAppointment
  wierdIndex


  constructor(
    private service: AppointmentsService,
    public format: FormatService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getOnlyHours();
    this.gettingData()
  }

  gettingData(){
    this.service.getData().subscribe((res) => {
      this.data = []
      this.nodeData = res
      this.logic()
    });
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

  logic() {

    
    this.formatData(this.date);
    for (let d of this.data) {
      d.day = formatDate(new Date(d.day), 'Y-MM-dd', 'en');
      for (let hour of d.hours) {
        this.nodeData.filter((t) => {
          
          let tdate = t.date.substring(0, 10);
          let hours = formatDate(t.date, 'HH:mm', 'en');
          // console.log(tdate + ' ' + hours + ' all: ' + d.day + ' ' + hour)
          if (tdate === d.day && hours === hour) {

            let full = tdate+' '+hour

            let obj = {
              t,
              hour,
              full
            };

            d.appointments.push(obj);
            d.bookedHours.push(hour);
            d.bookedHours = [...new Set(d.bookedHours)];
            this.status = true;
          }
        });
      }
    }

    // console.log(this.data);
    this.allAppointments();

    let helpArray = []

    for(let ap of this.futureAppointments){
      for (let a of ap){
        helpArray.push(a)
      }
    }

    // console.log(helpArray)

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

  // We get index when we open one news and arrows switch on next or previous
  nextAppointments() {

    let activeAppointmentIndex

    // console.log(this.gaArray.length-1)
    // console.log(this.wierdIndex)

    if(this.wierdIndex < this.gaArray.length-1){
      this.nodeData = []
      this.wierdIndex++
      activeAppointmentIndex = this.gaArray[this.wierdIndex]
      this.nodeData = this.groupedAppointments[activeAppointmentIndex]
      this.leftArrowStatus = true
    }

    if(this.wierdIndex === this.gaArray.length-1){
      this.rightArrowStatus = false
      this.leftArrowStatus = true
    }

  }

  previousAppointments() {
    this.nodeData = [];

    let activeAppointmentIndex

    console.log(this.gaArray.length-1)
    console.log(this.wierdIndex)

    if(this.wierdIndex >= 0){
      this.nodeData = []
      this.wierdIndex--
      activeAppointmentIndex = this.gaArray[this.wierdIndex]
      this.nodeData = this.groupedAppointments[activeAppointmentIndex]
      this.rightArrowStatus = true
    }

    if(this.wierdIndex === 0){
      this.leftArrowStatus = false
      this.rightArrowStatus = true
    }


  }

  // Used to show week on big calendar if date is picked on small ones
  // Its on side nav, event
  getDay(date) {
    console.log(date)
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
  select(data, day, hour, content) {
    /*After we open modal, automatically we get id of appointment in 
                                    futurea appointments array*/

    this.nodeData = [];

    for (let d of data) {
      if (d.hour === hour) {
        this.nodeData.push(d);
      }
    }

    this.modalService.open(content);
    
    // this part is for next and previous apps
    this.wierdIndex = this.gaArray.indexOf(day+' '+hour) 

    if(this.wierdIndex >= this.gaArray.length-1){
      this.rightArrowStatus = false
    }else{
      this.rightArrowStatus = true
    }

    if(this.wierdIndex <= 0){
      this.leftArrowStatus = false
    }else{
      this.leftArrowStatus = true
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

    let helperArray = []

    if (this.data) {
      this.futureAppointments = [];
      for (let d of this.data) {
        if (d.appointments.length > 0) {
          this.futureAppointments.push(d.appointments);
        }
      }
    }

    
    // this part is for grouping appointments 
    // and making grouped property so we can use it 
    // in select function and after in next and previous f

    let testerArray = []

      for(let fa of this.futureAppointments){
        for(let all of fa){
          helperArray.push(all)
          testerArray.push(all.full)
        }
      }

      this.gaArray = testerArray.filter(function(item, pos) {
      return testerArray.indexOf(item) == pos;
      })

      this.groupedAppointments = ((this.format.groupBy(helperArray, 'full'))); 

  }

  getNewValue(value){
    console.log(value)
    this.data = []
    this.nodeData.push(value)
    this.logic()
  }
}
