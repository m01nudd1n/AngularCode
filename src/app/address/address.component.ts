import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { Cart } from '../product/cart/cart.model';
import { AddressService } from '../shared/address.service';
import { Router } from '@angular/router';
import { Usermodel } from '../profile/usermodel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private userService: UserService ,private fb: FormBuilder,private router: Router, private cartService: CartService, private addressService: AddressService, private toastr: ToastrService) { }
  userId: string;
  cart: Cart[] = [];
  total: number;
  user: Usermodel;
  Email:string;
  addressFormModel = this.fb.group({

  });


  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.bringTheCart();
    this.getTheUserIdAndEmail();
  }

  bringTheCart() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cart = res;
      this.total = this.cart
      .map(item => item.Amount)
      .reduce((prev, next) => prev + next);
      console.log(this.cart);
    });
  }

  getTheUserIdAndEmail() {
    this.userService.getUserProfile().subscribe((res: any) => {
        this.user = res;
        this.userId = this.user.Id;
        this.Email = this.user.Email;
    });

  }

  addAddress(addressForm: NgForm) {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log("The form Value: " +addressForm.value);
    this.addressService.addAddress(addressForm.value).subscribe((response) => {

        this.toastr.info('Address Added !');
        this.router.navigateByUrl('/order');
        addressForm.reset();
    });
  }
}
