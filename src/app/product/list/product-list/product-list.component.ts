import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) {

   }
   products: Product;

  ngOnInit() {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

}
