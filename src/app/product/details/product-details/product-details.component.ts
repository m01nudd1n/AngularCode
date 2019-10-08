import { Product } from './../../product.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cart } from '../../cart/cart.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private toastr: ToastrService, private productService: ProductService, private router: Router, private cartService: CartService) { }

  pageTitle = 'Product Details';
  product: Product;
  productId: number;
quatity: number;
Quantity: number;
ngOnInit() {
  this.productId = +this.route.snapshot.paramMap.get('id');
  this.pageTitle += `: ${this.productId}`;


  this.productService.getProduct(this.productId).subscribe((response: any) => {
this.product = response;
console.log(response);
  });
  }
  addToTheCart(id: number, image: string, name: string, price: number, quantity: number,  amount: number) {

    var c = new Cart();
    c.ProductId = id;
    c.ProductName = name;
    c.Price = price;
    c.Amount = amount;
    c.ProductImage = image;
    c.Quantity = quantity;
  console.log(c);

    this.cartService.addToCart(c).subscribe((res) => {

        this.toastr.success('Item Added', '');

        this.ngOnInit();
      });
    }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
