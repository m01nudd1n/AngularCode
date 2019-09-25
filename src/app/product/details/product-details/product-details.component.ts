import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  pageTitle = 'Product Details';
  product: any;
  productId: number;

ngOnInit() {
  this.productId = +this.route.snapshot.paramMap.get('id');
  this.pageTitle += `: ${this.productId}`;


  this.productService.getProduct(this.productId).subscribe((response: any) => {
this.product = response;
console.log(response);
  });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
