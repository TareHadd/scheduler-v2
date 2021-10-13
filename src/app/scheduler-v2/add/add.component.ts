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
            user: [''],
            __typename: ['']
          }),
          __typename: ['']
        })

  }


  

  get id(){
    return this.nodes.get('id') as FormControl
  }


  open(content2) {
    this.modalService.open(content2, { size: 'sm' });
  }

  submit(){
    this.id.patchValue(this.random_num.toString())
    // console.log(this.data.value)
    this.dataVal.emit(this.nodes.value)
    this.modalService.dismissAll()
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