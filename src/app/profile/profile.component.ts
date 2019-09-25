import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }

  userDetails: any;

    ngOnInit() {
      this.service.getUserProfile().subscribe((res) => {
        console.log(res);
        this.userDetails = res;
      },
      err => {
        console.log(err);
      });
    }

    logOut() {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    }
}
