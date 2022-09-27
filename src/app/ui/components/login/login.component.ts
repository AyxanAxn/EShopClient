import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/model/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService,spinner:NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
  }
  async login(UsernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(UsernameOrEmail,password,()=>this.hideSpinner(SpinnerType.BallAtom));
  }
}