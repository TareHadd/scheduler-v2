import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-viewing',
  templateUrl: './next-viewing.component.html',
  styleUrls: ['./next-viewing.component.scss']
})
export class NextViewingComponent implements OnInit {

  @Input() appointments;
  filter
  next

  constructor() { }

  ngOnInit(): void {

    this.filter = this.appointments.filter( v => new Date(v.date) > new Date())

    this.next = this.filter[0]
  }

}
