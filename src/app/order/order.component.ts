import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Cart } from './../product/cart/cart.model';
import { Order } from './order.model';
import { Address } from './../address/address.model';
import { CartService } from './../shared/cart.service';
import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../shared/address.service';

import { Usermodel } from '../profile/usermodel';
import { Orderdetails } from './orderdetails.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  carts: Cart[];
  customer: Usermodel;
  orderAddress: number[];
  userAddresses: Address;
  userId: string;
  ProductName: any;
  ProductId: any;
  Quantity: any;
  Price: any;
  ProductImage: any;
  addressId;
amount;
cartTotal: number[];
total: number[];
sum: number;
  fullName;
  email;
  streetAddress;
  city;
  pinCode;
  state;
calculateAmount = 0;
  order: Order = new Order();
  orderDetail: Orderdetails = new Orderdetails();
  constructor(private router: Router ,private toastr: ToastrService,private orderService: OrderService, private addressService: AddressService, private cartService: CartService, private userService: UserService) {

   }

  ngOnInit() {
    this.getCart();
  }

  getAddress() {
    console.log(this.userId, this.order.CustomerId)
    if (this.order.CustomerId) {
      this.addressService.getAddress(this.order.CustomerId).subscribe((address: any) => {
        console.log('The customer id: ' , this.userId);
        this.userAddresses = address;
        console.log('The customer address: ' , this.userAddresses);
        this.order.AddressId = this.userAddresses.Id ;
        console.log(this.userAddresses);
        this.fullName = this.userAddresses.FullName;
        this.email = this.userAddresses.Email;
        this.streetAddress = this.userAddresses.StreetAddress;
        this.city = this.userAddresses.City;
        this.pinCode = this.userAddresses.PinCode;
      });
    }
  }



  getCart() {
    this.cartService.getCart().subscribe((cartresponse: Cart[]) => {
      this.carts = cartresponse;
      this.order.CustomerId = this.carts[0].CustomerId;
      this.userId = this.carts[0].CustomerId;
      //this.order.Amount = this.carts.map(item => item.Amount).reduce((prev, next) => prev + next);
      this.total = this.carts.map(item => item.Amount);

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.total.length; index++) {
        this.calculateAmount += this.total[index];

      }



      this.order.Amount = this.calculateAmount;

      this.orderDetail.ProductId = this.carts.map(item => item.ProductId);
      this.orderDetail.ProductName = this.carts.map(item => item.ProductName);
      this.orderDetail.CustomerId = this.carts.map(item => item.CustomerId);

      this.orderDetail.Price = this.carts.map(item => item.Price);
      this.orderDetail.Quantity = this.carts.map(item => item.Quantity);

      this.getAddress();
    });
  }

  placeTheOrder() {

    if (this.order) {


      this.orderService.placeOrder(this.order).subscribe((res) => {
          console.log("Inside res");
          this.toastr.success('Order Placed!');
          this.router.navigateByUrl('/profile');

          // this.addOrderDetails();
      },
      err=>{
        console.log("Err")
      });

    }
  }

  // addOrderDetails() {
  //   debugger
  //   console.log(this.orderDetail);
  //   if (this.orderDetail) {
  //     this.orderService.AddDetailsOfOrder(this.orderDetail).subscribe();
  //   }

  // }

}
