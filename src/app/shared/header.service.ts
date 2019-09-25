import { CartComponent } from './../product/cart/cart.component';
import { Injectable } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private cart : ProductService) { }
  cartlength = this.cart.getCart.length;

}
