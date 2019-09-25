import { Product } from './../product/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeService } from '../shared/home.service';
import { Cart } from '../product/cart/cart.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute
              , private cartService: CartService) { }
  products: Product;
  productFilter;
  productId: number;



  ngOnInit() {

    this.homeService.getProducts().subscribe((response: any) => {
      this.products = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

  }
  ProductName: string;
  ProductId: number;
  Quantity: number;
  Amount: number;
  Price: number;
ProductImage: string;

addToTheCart(id: number, image: string, name: string, price: number, quantity: number,  amount: number) {

  var c = new Cart();
  c.ProductId = id;
  c.ProductName = name;
  c.Price = price;
  c.Amount = amount;
  c.ProductImage = image;
  c.Quantity = quantity;
console.log(c);

  this.homeService.addToCart(c).subscribe(() => {
      this.ngOnInit();
    });
  }

}
