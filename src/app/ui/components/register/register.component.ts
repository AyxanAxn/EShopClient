import { group, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      username:["",
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]
    ],
      email:["",
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.email]],
      password:["",
        Validators.required],
      confirmPassword:["",
        Validators.required
    ]
    },
    {
      validators : (group : AbstractControl) : ValidationErrors | null=> {
      let password = group.get("password").value;
      let confirmPassword=group.get("confirmPassword").value;
      return password=== confirmPassword ? null : {notSame: true};
    }
    });
  }

  //  get is used to create a parametr:
    get component(){
      return this.frm.controls;
    }
    submitted:boolean=false;
  onSubmit(data: any){
    this.submitted = true;
    
    
    if(this.frm.invalid) return
  }
}