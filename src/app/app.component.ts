import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appointment-scheduler-copy';
  viewDate: Date = new Date();
  events = [];

    @HostListener('window:resize', ['$event'])
    onResize(event) {
    event.target.innerWidth;
  }
}
