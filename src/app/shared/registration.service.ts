import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly baseUri = 'http://localhost:5000/api/applicationuser/register';
    formModel = this.fb.group({
      UserName : ['', Validators.required],
      Email: ['', Validators.email],
      FullName: [''],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['',  Validators.required]
      },
      {
        validator: this.comparePasswords
      }

      ),
    });
    comparePasswords(fb: FormGroup){
      const confirmPasswordCtrl = fb.get('ConfirmPassword');
      if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
        if (fb.get('Password').value !== confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({passwordMismatch: true} ) ;
        } else {
              confirmPasswordCtrl.setErrors(null);
        }
      }
    }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    console.log(body);
    return this.http.post(this.baseUri, body);

  }

  }
