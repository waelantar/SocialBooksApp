import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private  router :Router,
    private authService: AuthenticationService
  ) {
  }
registerRequest:RegistrationRequest={email:'',firstname:'',lastname:'',password:''};
errorMsg: Array<string>=[]

  register() {
this.errorMsg=[];
this.authService.register(
  {
    body:this.registerRequest
  }).subscribe({next:()=>{
      this.router.navigate(['activate-account']);
  },
  error:(err):void =>{
    console.log(err.error);
    if(err.error.validationErrors)
    {
      this.errorMsg=err.error.validationErrors;
    }
    else {
      console.log(err.error.error);
    }
  }})
  }

  login() {
  this.router.navigate(['login']);
  }
}
