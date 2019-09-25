import { HeaderService } from './../../shared/header.service';
import { CartComponent } from './../../product/cart/cart.component';
import { UserService } from './../../shared/user.service';


import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _productService: ProductService, private headerService: HeaderService) { }
products;
  ngOnInit() {
    this._productService.getCart().subscribe();
    this.products = this.headerService.cartlength;
    console.log('the length '+this.products)
  }

}
