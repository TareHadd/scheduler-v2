import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { addDays, eachDayOfInterval, endOfWeek, startOfWeek, subDays } from 'date-fns';
import { AppointmentsService } from '../core/services/appointments.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
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

  weekdays;
  data = [];
  bookedHours = [];

  nodeData = [];
  nodeDataKeeper = []
  falseNodeData = []

  numberOfAppointments;

  // used to get next appointment in modal
  futureAppointments = [];
  rightArrowStatus = true;
  leftArrowStatus = true;
 
  groupedAppointments
  gaArray = []
  singleAppointment
  wierdIndex

  statusForSpinner = false
  pastDateStatus = false


  /*
  gettingData() -> formatData() -> logic() 

   * formatData() -> redesign this.data
   * logic() -> fills this.data appointment and bookedHours property and calls allAppointment()
   * allAppointments() -> makes future appointments by deleting empty appointments from this.data and using others
    and then makes helperArray and testerArray so we  can use it while switching to next or previous appointment in modal
    
    That data is called in select() and select() gives data for switching appointments by getting opened appointment data
    It uses that falseNodeData because at first was nodeData
  */

  /* IMPORTANT
    	delete timeout function from logic when connecting to internet data
  */

  constructor(
    private service: AppointmentsService,
    public format: FormatService,
    private config: NgbModalConfig,
    private modalService: NgbModal
  ) {

    config.backdrop = 'static'
    config.keyboard = false
  }

  ngOnInit(): void {
    this.getOnlyHours();
    this.gettingData()
    console.log(innerWidth)
  }

  gettingData(){
    this.statusForSpinner = true
    this.service.getData().subscribe((res) => {
      this.data = []
      this.nodeData = res
      this.nodeDataKeeper = res
      this.formatData(this.date);
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

    setTimeout(() => {
      this.statusForSpinner = false
    for (let d of this.data) {
      d.day = formatDate(new Date(d.day), 'Y-MM-dd', 'en');
      for (let hour of d.hours) {
        this.nodeData.filter((t) => {
          
          // let tdate = t.date.substring(0, 10);
          let tdate = formatDate(t.date, 'Y-MM-dd', 'en');
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
           
          }
        });
      }

    }
    this.allAppointments();
    }, 500);
    
    

    console.log(this.data)

    console.log(this.nodeData)

    // console.log(this.data);
    

    // let helpArray = []

    // for(let ap of this.futureAppointments){
    //   for (let a of ap){
    //     helpArray.push(a)
    //   }
    // }

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
    this.statusForSpinner = true
    this.date = addDays(this.date, 7);
    this.data = [];
    // this.nodeData = []
    // this.nodeData = this.nodeDataKeeper
    this.formatData(this.date);
    this.logic()
  }

  previousWeek() {
    this.statusForSpinner = true
    this.date = subDays(this.date, 7);
    this.data = [];
    // this.nodeData = []
    this.nodeData = this.nodeDataKeeper
    this.formatData(this.date);
    this.logic()
  }

  // We get index when we open one news and arrows switch on next or previous
  nextAppointments() {

    let activeAppointmentIndex

    // console.log(this.gaArray.length-1)
    // console.log(this.wierdIndex)

    if(this.wierdIndex < this.gaArray.length-1){
      this.falseNodeData = []
      this.wierdIndex++
      activeAppointmentIndex = this.gaArray[this.wierdIndex]
      this.falseNodeData = this.groupedAppointments[activeAppointmentIndex]
      this.leftArrowStatus = true
    }

    if(this.wierdIndex === this.gaArray.length-1){
      this.rightArrowStatus = false
      this.leftArrowStatus = true
    }

  }

  previousAppointments() {
    this.falseNodeData = [];

    let activeAppointmentIndex

    console.log(this.gaArray.length-1)
    console.log(this.wierdIndex)

    if(this.wierdIndex >= 0){
      this.falseNodeData
      this.wierdIndex--
      activeAppointmentIndex = this.gaArray[this.wierdIndex]
      this.falseNodeData = this.groupedAppointments[activeAppointmentIndex]
      this.rightArrowStatus = true
    }

    if(this.wierdIndex === 0){
      this.leftArrowStatus = false
      this.rightArrowStatus = true
    }


  }

  allAppointments() {

    let helperArray = []

    if (this.data) {
      this.futureAppointments = [];
      for (let d of this.data) {
        console.log(d.appointments)
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

      console.log(this.futureAppointments)

  }

  getNewValue(value){
    this.statusForSpinner = true
    this.data = []
    this.nodeData.push(value)
    this.formatData(this.date);
    this.logic()
  }

  // Called when we add new appointment to existing appointment in that date and time (modal in modal)
  addNewAppModal(value){
    this.statusForSpinner = true
    this.falseNodeData = []
    // this.status = true
    // this.nodeData = this.nodeDataKeeper
    this.nodeData.push(value)
    this.data = []
    this.getOnlyHours()
    this.formatData(this.date);
    this.logic()
    // this.nodeDataKeeper = []
    // this.nodeDataKeeper = this.nodeData
    this.modalService.dismissAll()
  }


  // MODAL STUFF
  //
  // modal open f
  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  placeHolderForOpen(content3){
    this.open(content3)
  }

  open(content3) {
    this.modalService.open(content3, { size: 'sm', centered: true }, );
  }

  // close modal
  close(){
    this.falseNodeData = []
    // this.nodeData = this.nodeDataKeeper
    // this.data = []
    // this.getOnlyHours()
    // this.formatData(this.date);
    // this.logic()
    this.modalService.dismissAll()
    this.pastDateStatus = false
  }

  // Used to open modal with given data
  select(data, day, hour, content) {
    /*After we open modal, automatically we get id of appointment in 
                                    futurea appointments array*/

    // this.nodeDataKeeper = this.nodeData
    // console.log(this.nodeData)
    // this.nodeData = [];

    for (let d of data) {
      if (d.hour === hour) {
        this.falseNodeData.push(d);
        // console.log(hour)
        // console.log(d.hour)
      }
    }
    // console.log(this.falseNodeData)

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

    console.log(this.gaArray)


  }

  // DATA IN HTML 
  //

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


  // SMALL CALENDAR TO BIG
    
  // Used to show week on big calendar if date is picked on small ones
  // Its on side nav, event
  getDay(date) {
    this.statusForSpinner = true
    console.log(date)
    let year = date.year;
    let month = date.month;
    let day = date.day;

    this.date = new Date(year, month - 1, day);
    this.data = [];
    this.formatData(this.date)
    this.logic();
  }

  delete(data){
    if(new Date(data.full) < new Date){
      this.pastDateStatus = true
      return
    }else{
      this.pastDateStatus = false
      this.statusForSpinner = true
      this.data = []
      this.falseNodeData = this.falseNodeData.filter(t => t !== data)
      this.nodeData = this.nodeData.filter(t => t !== data.t)
      this.formatData(this.date)
      this.logic()
      this.falseNodeData = []
      this.modalService.dismissAll()
    }
  }


}
