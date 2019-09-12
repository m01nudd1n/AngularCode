import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  pageTitle = 'Product Details';
  product;
  productId: number;

ngOnInit() {
  this.productService.getProduct(this.productId).subscribe((response: any) => {
this.product = response;
console.log(response);
  });
  }

}
