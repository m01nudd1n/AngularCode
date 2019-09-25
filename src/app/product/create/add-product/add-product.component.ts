import { Product } from './../../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  categories: any;

  ngOnInit() {

  }


  addProduct(nf: NgForm) {
    console.log(nf.value);
    this.productService.addProductToDb(nf.value)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/products');
      },
        (err) => {
          console.log(err);
        });


  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
