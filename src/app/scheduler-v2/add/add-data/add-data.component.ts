import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  @Input() date
  @Input() hour
  @Output() dataVal = new EventEmitter<any>()

  nodes:FormGroup
  random_num = Math.floor(Math.random() * 1000000)
  error = ''

  constructor(private fb: FormBuilder) {

      this.nodes = this.fb.group({
          id: [''],
          date: ['', Validators.required],
          maxInviteeCount: [''],
          attendeeCount: [''],
          showContactInformation: [''],
          contact: this.fb.group({
            firstName: ['', Validators.required],
            name: ['', Validators.required],
            email: [''],
            mobile: [''],
            phone: [''],
            address: this.fb.group({
              street: [''],
              houseNumber: [''],
              city:[''],
              country: [''],
              zipCode: [''],
              __typename: ['']
            }),
            fullName: ['']
          }),
          property: this.fb.group({
            id: [''],
            name: ['', Validators.required],
            inviteeCount: [''],
            address: this.fb.group({
              street: ['', Validators.required],
              houseNumber: ['', Validators.required],
              city: ['', Validators.required],
              country: ['', Validators.required],
              zipCode: ['', Validators.required],
              __typename: ['']
            }),
            attachments: this.fb.array([]),
            user: this.fb.group({
              profile: this.fb.group({
                firstname: [''],
                name: [''],
                phone: [''],
                gender: [''],
                title:['']
              })
            }),
            __typename: ['']
          }),
          __typename: ['']
        })

  }

  get id(){
    return this.nodes.get('id') as FormControl
  }

  get formDate(){
    return this.nodes.get('date') as FormControl 
  }

  ngOnInit(): void {
  }


  submit(){
    this.id.patchValue(this.random_num.toString())

    if(new Date(this.formDate.value) < new Date){
      this.error = "Date can't be old!"
      return
    }

    this.dataVal.emit(this.nodes.value)

  }

  patchDate(date, hour){
    this.formDate.patchValue(date+'T'+hour)
  }
}
