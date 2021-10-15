import { formatDate } from '@angular/common';
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
  nodes: FormGroup
  dateError = ''

  currentDate = new Date()
  modalDate
  status = true

  submitted = false
  

  constructor(
    private modalService: NgbModal, 
    private fb: FormBuilder) {

    this.nodes = this.fb.group({
        id: [''],
        date: ['', Validators.required],
        maxInviteeCount: ['', Validators.required],
        attendeeCount: ['', Validators.required],
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
              firstname: ['',Validators.required],
              name: ['',Validators.required],
              phone: [''],
              gender: [''],
              title:['']
            }),
            usertype: ['', Validators.required],
            __typename: ['']
          }),
          __typename: ['']
        }),
        __typename: ['']
      })

  }

  get formDate(){
    return this.nodes.get('date') as FormControl 
  }

  get contact(){
    return this.nodes.get('contact') as FormGroup
  }

  get property(){
    return this.nodes.get('property') as FormGroup
  }
  

  open(content2, date, time) {
    if(new Date(date+'T'+time) < new Date()){
      this.status = false
    }
    console.log(new Date(date+'T'+time))
    this.modalService.open(content2, { size: 'sm' });
  }

  close(){
    this.modalService.dismissAll()
  }

  submit(){
    this.id.patchValue(this.random_num.toString())

    if(new Date(this.formDate.value) < new Date){
      this.dateError = "Date can't be old, pick a date from future"
      return
    }

    this.submitted = true

    if(!this.nodes.valid){
       this.dataVal.emit(this.nodes.value)
    }else{
      return
    }
   
    
    this.modalService.dismissAll()
    console.log(this.nodes.value)
  }

  patchDate(date, hour){
    this.formDate.patchValue(date+'T'+hour)
  }


  // NODES

  get id(){
    return this.nodes.get('id') as FormControl
  }

  get mic(){
    return this.nodes.get('maxInviteeCount') as FormControl
  }

  get ac(){
    return this.nodes.get('attendeeCount') as FormControl
  }

  // 


  // CONTACT

  get cname(){
    return this.contact.get('name') as FormControl
  }

  get cfirstName(){
    return this.contact.get('firstName') as FormControl
  }

  // 



  // PROPERTY

  get pname(){
    return this.property.get('name') as FormControl
  }


  // address

  get address(){
    return this.property.get('address') as FormGroup
  }

  get street(){
    return this.address.get('street') as FormControl
  }

  get houseNum(){
    return this.address.get('houseNumber') as FormControl
  }

  get city(){
    return this.address.get('city') as FormControl
  }

  get country(){
    return this.address.get('country') as FormControl
  }

  get zip(){
    return this.address.get('zipCode') as FormControl
  }

  // 


  //  USER

  get user(){
    return this.property.get('user') as FormGroup
  }

  get profile(){
    return this.user.get('profile') as FormGroup
  }

  get ufirstName(){
    return this.profile.get('firstname') as FormControl
  }

  get uName(){
    return this.profile.get('name') as FormControl
  }

  get userType(){
    return this.user.get('usertype') as FormControl
  }


  // 

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