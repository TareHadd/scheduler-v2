import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }


  groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, []);
    return newObj;
  }

  formatDate(elem){
    let fix

    if(elem<10){
      fix = '0'+elem
    }else
    {
      fix = elem
    }

    return fix
  }
  
  
}
