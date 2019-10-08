import { DataSharingService } from './../../shared/datasharing.service';
import { Router } from '@angular/router';
import { HeaderService } from './../../shared/header.service';
import { CartComponent } from './../../product/cart/cart.component';
import { UserService } from './../../shared/user.service';

import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { Cart } from 'src/app/product/cart/cart.model';
import { Usermodel } from 'src/app/profile/usermodel';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription[];
  cart: number;
  userProfile: Usermodel;
  fullName: string;
  _listFilter = '';
  // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  constructor(private _productService: ProductService, private headerService: HeaderService, private router: Router, private dataShare: DataSharingService, private userService: UserService) {
    this.token = localStorage.getItem('token');

    this.subscription = [];
    this.subscription.push(
      this.dataShare.isItemAdded.subscribe((action: number) => {
        this.cart = action;
        console.log("Header Constructor" + this.cart);
      })
    );

    this.subscription.push(
      this.dataShare.isItemRemoved.subscribe((action: number) => {
        this.cart = action;
        console.log("Header Constructor" + this.cart);
      })
    );



    // this.subscription = this.dataShare.getData()
    //                   .subscribe((res =>{
    //                     this.cart.push(res);
    //                     console.log('The Cart '+this.cart.push(res));
    //                   }));

  }
  token;


  ngOnInit() {
    this._productService.getCart().subscribe((res: any) => {
      //   this.cart = res;

    });
    if (this.token !== null) {
      this.userService.getUserProfile().subscribe((res: Usermodel) => {
        this.userProfile = res;
        this.fullName = this.userProfile.FullName;
      });
    }

  }

  rElOaD() {
    location.reload();
  }

  onSearch(query) {
    query = this._listFilter;
    this.dataShare.notifySearch(this._listFilter);
    console.log(this._listFilter);
    this.router.navigate(['/home']);
  }
  logOut() {
    localStorage.removeItem('token');
    location.reload();

    this.ngOnInit();
  }
}
