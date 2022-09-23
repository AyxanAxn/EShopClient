import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }


  frm : FormGroup;
  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      nameSurname:["",
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      username:["",
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]
    ],
      email:["",
      [Validators.required,
        Validators.maxLength(50),
        Validators.email]],
      password:[""],
      confirmEmail:[""]
    });
  }

  //  get is used to create a parametr:
    get component(){
      return this.frm.controls;
    }
  onSubmit(data: any){
    debugger;
  }
}