import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() date;
  @Input() time;
  @Output() dataVal = new EventEmitter<any>()

  random_num = Math.floor(Math.random() * 1000000)
  nodes
  dateError = ''

  currentDate = new Date()
  modalDate
  status = true
  

  constructor(
    private modalService: NgbModal, 
    private fb: FormBuilder) {

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


  dateManipulation(){
    if(this.date){
      this.modalDate = this.date
    }
  }

  

  get id(){
    return this.nodes.get('id') as FormControl
  }

  get formDate(){
    return this.nodes.get('date') as FormControl 
  }

  open(content2, date) {
    if(new Date(date) < new Date()){
      this.status = false
    }
    console.log(new Date(this.date))
    this.modalService.open(content2, { size: 'sm' });
  }

  submit(){
    this.id.patchValue(this.random_num.toString())

    if(new Date(this.formDate.value) < new Date){
      this.dateError = "Date can't be old, pick a date from future"
      return
    }

    this.dataVal.emit(this.nodes.value)
    this.modalService.dismissAll()
  }

  patchDate(date, hour){
    this.formDate.patchValue(date+'T'+hour)
  }

  ngOnInit(): void {
  }

}


/*
this.data = this.fb.group({
      data: this.fb.group({
        appointments: this.fb.group({
          nodes: this.fb.array([
            this.fb.group({
              id: this.fb.control(''),
              date: this.fb.control(''),
              maxInviteeCount: this.fb.control(''),
              attendeeCount: this.fb.control(''),
              showContactInformation: this.fb.control(''),
              contact: this.fb.group({
                firstName: this.fb.control(''),
                name: this.fb.control(''),
                email: this.fb.control(''),
                mobile: this.fb.control(''),
                phone: this.fb.control(''),
                address: this.fb.group({
                  street: this.fb.control(''),
                  houseNumber: this.fb.control(''),
                  city: this.fb.control(''),
                  country: this.fb.control(''),
                  zipCode: this.fb.control(''),
                  __typename: this.fb.control('')
                }),
                fullName: this.fb.control('')
              }),
              property: this.fb.group({
                id: this.fb.control(''),
                name: this.fb.control(''),
                inviteeCount: this.fb.control(''),
                address: this.fb.control(''),
                attachments: this.fb.array([]),
                user: this.fb.control(''),
                __typename: this.fb.control('')
              }),
              __typename: this.fb.control('')
            })
          ]),
          page: this.fb.group({
            cursor: this.fb.control(''),
            hasNext: this.fb.control(''),
            hasPrev: this.fb.control(''),
            next: this.fb.control(''),
            page: this.fb.control(''),
            prev: this.fb.control(''),
            size: this.fb.control(''),
            totalElements: this.fb.control(''),
            totalPages: this.fb.control(''),
            __typename: this.fb.control('')
          })
        })
      })
      
    })

*/