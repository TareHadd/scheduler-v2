import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() nodeData
  @Output() date = new EventEmitter<any>()

  openNav = true
  today = new Date()

  constructor() { }

  ngOnInit(): void {
  }

  openClose(){
    this.openNav = !this.openNav
  }

  getDay(day){
    // console.log(day)
    this.date.emit(day)
  }

}
