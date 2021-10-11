import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Data } from '../models/thedata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<any>('../../assets/data.json').pipe(
      map(
        res => {
           let node = res.data.appointments.nodes.sort(function (a, b) {
            var dateA = new Date(a.date).valueOf(), dateB = new Date(b.date).valueOf()
            return dateA - dateB
          });
          //  console.log(node)
           return node
         }
      )
    )
  }
}
