import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  loginFormModel = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  });

  login() {
    const loginFormBody = {
      UserName: this.loginFormModel.value.UserName,
      Password: this.loginFormModel.value.Password
    };
    console.log(loginFormBody);

    return this.http.post('http://localhost:5000/api/applicationuser/login', loginFormBody);

  }

  getUserProfile() {
    const tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});

    return this.http.get('http://localhost:5000/api/userprofile', {headers: tokenHeader});
  }
  }


