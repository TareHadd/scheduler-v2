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

  submitted = false

  constructor(private fb: FormBuilder) {

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
  

  ngOnInit(): void {
  }


  submit(){
    this.id.patchValue(this.random_num.toString())

    if(new Date(this.formDate.value) < new Date){
      this.error = "Date can't be old!"
      return
    }

    this.submitted = true

    if(!this.nodes.valid){
       this.dataVal.emit(this.nodes.value)
    }else{
      return
    }
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

  patchDate(date, hour){
    this.formDate.patchValue(date+'T'+hour)
  }
}
