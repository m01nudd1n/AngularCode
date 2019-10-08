import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { NgForm} from '@angular/forms';
import { Product } from '../../product.model';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }
  productId: number;
  product: Product;

ProductSubcategory: string;
ProductName       : string;
ProductColor      : string;
ProductBrand      : string;
Price             : number;
ProductGender     : string;
CategoryId        : number;
CategoryName      : string;
ProductImage      : string;
ProductDescription: string;
Quantity          : number;

  ngOnInit() {
    this.product = new Product();

    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.productService.getProduct(this.productId).subscribe((response: Product) => {
      if (response) {
        this.product = response;
        this.Quantity = this.product.Quantity;
        this.ProductSubcategory = this.product.ProductSubcategory;
      }

      console.log(response);
      console.log( this.ProductSubcategory);
        });
  }
  updateProduct(nf: NgForm) {
    console.log(nf.value);
    this.productService.updateProductInDb(this.productId, nf.value)
          .subscribe((data) => {
            this.router.navigate(['/products']);
          });
    }

}
