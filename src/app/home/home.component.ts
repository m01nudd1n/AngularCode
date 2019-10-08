import { Usermodel } from './../profile/usermodel';
import { UserService } from './../shared/user.service';

import { DataSharingService } from './../shared/datasharing.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../product/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeService } from '../shared/home.service';
import { Cart } from '../product/cart/cart.model';
import { CartService } from '../shared/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription[];
  productFilter;

  products: any[];

  productId: number;
  cart: any[];
  productsArray: Product[] = [];
  filteredProducts: Product[];
  user: Usermodel;
  userId: string;

  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute
    , private toastr: ToastrService, private dataShare: DataSharingService, private cartService: CartService
    , private userService: UserService) {

    this.subscription = [];
    this.subscription.push(
      this.dataShare.search.subscribe((action: number) => {
        this.productFilter = action;

        console.log("Header Constructor: " + this.productFilter);
      })
    );

    this.subscription.push(
      this.dataShare.UserId.subscribe((action: string) => {
        debugger
        this.userId = action;
      })
    );
  }

  //   ProductName: string;
  //   ProductId: number;
  //   Quantity = 1;
  //   Amount: number;
  //   Price: number;
  // ProductImage: string;






  //  get listFilter(): string {
  //    return this._listFilter;
  //  }
  //  set listFilter(value: string) {
  //    this._listFilter = value;
  //    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.productsArray;
  //  }


  ngOnInit() {


    console.log(Date.now);


    /*-------------------------------------------------------------------------------------------------------*/
    this.getTheProducts();

    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.getTheCart();
    this.getTheUserId();
    this.getTheUserId();

  }
  date;
  getDate() {
    this.date = Date.now();
  }

  addToTheCart(id: number, image: string, name: string, price: number, quantity: number, amount: number, userId: string) {

    var c = new Cart();

    c.ProductId = id;
    c.ProductName = name;
    c.Price = price;
    c.Quantity = quantity;
    c.Amount = amount;
    c.ProductImage = image;
    c.CustomerId = userId;

    console.log('The User : ' + c.CustomerId);




    var check = localStorage.getItem('token');

    if (check != null) {
    this.homeService.addToCart(c).subscribe((res) => {
      const l = this.cart.push(this.cart.length);
      this.dataShare.notifyIfItemAdded(l);
      this.ngOnInit();
      this.toastr.success('Added to cart');


    });
    }
    else{
      this.toastr.warning('Please Log in First!');
    }

  }


  getTheProducts() {
    this.homeService.getProducts().subscribe((response: any) => {
      this.products = response;

      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  getTheCart() {
    this.cartService.getCart().subscribe((resp: any) => {
      this.cart = resp;

    });

  }

  getTheUserId() {
    this.userService.getUserProfile().subscribe((res: any) => {
      this.user = res;
      console.log(res)
      this.userId = this.user.Id;
    });

  }




}
