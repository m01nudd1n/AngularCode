import { RegistrationService } from './../../../shared/registration.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public registrationService: RegistrationService, private toastr: ToastrService) {}

  ngOnInit() {
    this.registrationService.formModel.reset();
  }

onSubmit() {
  this.registrationService.register().subscribe(
    (resonse: any) => {
    if (resonse.succeeded) {
      this.registrationService.formModel.reset();
      this.toastr.success('New User Created', 'Registration Successful');
    } else {
      resonse.errors.forEach(element => {
        switch (element) {
            case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration Failed');
                break;

            default:
                this.toastr.error(element.description, 'Registration Failed');
                break;
        }
      });
    }
  },
  err => {
    console.log(err);
  } );
}

}
