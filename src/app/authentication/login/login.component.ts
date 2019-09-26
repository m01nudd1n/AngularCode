import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
        this.router.navigateByUrl('/profile');
    }
  }

onSubmit() {
  this.loginService.login().subscribe((res: any) => {
    localStorage.setItem('token', res.token);
    this.loginService.loginFormModel.reset();
    this.router.navigateByUrl('/home');
  },
  err => {
    if (err.status == 400) {
        this.toastr.error('Incorrect user name or password', 'Authentication failed');
    } else {
        console.log(err);
    }
  });

}
}
