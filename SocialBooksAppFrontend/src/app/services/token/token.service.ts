import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }


  isTokenNotValid() {
    return !this.TokenValid();
  }

  private TokenValid() {

    const token =this.token;
    if(!token)
    {console.log("hello no token")
      return false;
    }
    const  jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired)
    {console.log("hello")
      localStorage.clear();
      return false;
    }
    console.log("hellodone")
    return true;
  }
}
