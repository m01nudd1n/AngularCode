import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

getUserProfile() {
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});

  return this.http.get('http://localhost:5000/api/userprofile', {headers: tokenHeader});
}
}
