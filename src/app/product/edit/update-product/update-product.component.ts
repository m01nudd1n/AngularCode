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
  product: any;
  ngOnInit() {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.productService.getProduct(this.productId).subscribe((response: any) => {
      this.product = response;
      console.log(response);
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
