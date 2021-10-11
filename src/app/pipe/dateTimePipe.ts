import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common'
import {Node} from '../models/thedata'

@Pipe({
  name: 'letsFix'
})

export class DateTimePipe implements PipeTransform{

   transform(value: Node[], day, hour){

   
        let array = []
    
        return value.filter(t => {
        
            let tdate = t.date.substring(0,10);
            let hours = formatDate(t.date, 'HH:mm', 'en');

        if( tdate === day && hours === hour){
            return t
        }else{
            return null
        }
        })
       
   }

}