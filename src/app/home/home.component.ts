
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
  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute
              , private toastr: ToastrService, private dataShare: DataSharingService, private cartService: CartService) {

                this.subscription = [];
                this.subscription.push(
      this.dataShare.search.subscribe((action: number) => {
          this.productFilter = action;

          console.log("Header Constructor"+this.productFilter);
          })
  );
               }
  products: any[];

  productId: number;
cart: any[];
//   ProductName: string;
//   ProductId: number;
//   Quantity = 1;
//   Amount: number;
//   Price: number;
// ProductImage: string;
productsArray: Product[] = [];
filteredProducts: Product[];





  //  get listFilter(): string {
  //    return this._listFilter;
  //  }
  //  set listFilter(value: string) {
  //    this._listFilter = value;
  //    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.productsArray;
  //  }


  ngOnInit() {





    /*-------------------------------------------------------------------------------------------------------*/
    this.homeService.getProducts().subscribe((response: any) => {
      this.products = response;

      console.log(response);
    }, err => {
      console.log(err);
    });
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.cartService.getCart().subscribe((resp: any) => {
      this.cart = resp;

    });

  }



addToTheCart( id: number, image: string, name: string, price: number, quantity: number,  amount: number) {

  var c = new Cart();
  var l = this.cart.push(this.cart.length);
  c.ProductId = id;
  c.ProductName = name;
  c.Price = price;
  c.Amount = amount;
  c.ProductImage = image;
  c.Quantity = quantity;



  this.dataShare.notifyIfItemAdded(l);


  this.homeService.addToCart(c).subscribe((res) => {
    this.ngOnInit();
    this.toastr.success('Added to cart');


    });
  }

}
