import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Cart } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productService: ProductService) { }
cartItems: Cart;
  ngOnInit() {
    this.productService.getCart().subscribe((response: any) => {
      this.cartItems = response;
      console.log(response);
    }, err => {
      console.log(err);
    });

  }

removeFromCart(id) {

}

}

