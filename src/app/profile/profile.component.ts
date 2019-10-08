import { Address } from './../address/address.model';
import { Order } from './../order/order.model';
import { DataSharingService } from 'src/app/shared/datasharing.service';
import { Component, OnInit, IterableDiffers } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Usermodel } from './usermodel';
import { AddressService } from '../shared/address.service';

import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private addressService: AddressService, private router: Router, private service: UserService, private dataShareService: DataSharingService, private orderService: OrderService) { }
Id;
  userDetails: Usermodel;
  orderDetail: Order[];
  order: Order;
  address: Address;
  fullName: string;
  email: string;
  userId: string;
  userName: string;

  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: string;

  custId:any[];
  orderDate:any[];
  orderId:any[];
  TotalAmount:any[];

  showAddress = false;
  showOrders = false;
    ngOnInit() {


      this.order = new Order();


      this.getProfile();



    }

    toggleAddress() {
      this.showAddress = !this.showAddress;
  }

    getProfile() {
      this.service.getUserProfile().subscribe((res: Usermodel) => {
        console.log(res);
        this.userDetails = res;
        this.fullName = this.userDetails.FullName;
        this.email = this.userDetails.Email;
        this.userName = this.userDetails.UserName;
        this.userId = this.userDetails.Id;
        this.Id = this.userId;
        console.log(this.fullName, this.fullName);
        debugger
        if (res) {
          this.getAddress(this.userDetails.Id);
        }
      },
      err => {
        console.log(err);
      });


    }

    getAddress(userId) {
      this.addressService.getAddress(userId).subscribe((addressResponse: any) => {
        this.address = addressResponse;

        this.streetAddress = this.address.StreetAddress;
        this.city = this.address.City;
        this.state = this.address.State;
        this.pinCode = this.address.PinCode;
        this.addressType = this.address.AddressType;

        this.getOrders(userId);
      });
}

    getOrders(userId) {
      this.orderService.getOrders(userId).subscribe((orderResponse: any[]) => {
        this.orderDetail = orderResponse;
        this.orderId = this.orderDetail.map((item => item.Id));
        this.orderDate = this.orderDetail.map((item => item.OrderDate));
        this.custId = this.orderDetail.map((item => item.CustomerId));
        this.TotalAmount = this.orderDetail.map((item => item.Amount));
        console.log('The orders', this.orderDetail);
      });

    }
    logOut() {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    }
}
