import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {

   }
   products: Product;
   productsArray: Product[] = [];
   filteredProducts: Product[];
   productId: number;

   _listFilter = '';
   get listFilter(): string {
     return this._listFilter;
   }
   set listFilter(value: string) {
     this._listFilter = value;
     this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.productsArray;
   }


  ngOnInit() {


    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
      console.log(response);
    }, err => {
      console.log(err);
    });


  }


  deleteProduct(productId) {

    const ans =  confirm('Do you want to Delete this item ?');
    if (ans) {
      this.productId = this.products.Id;
      this.productService.deleteProductFromDb(productId)
      .subscribe(() => {
        this.ngOnInit();

      });

  }
  }

  addToCart(productId, product) {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.productService.addToCart(productId, product).subscribe(() => {
      this.ngOnInit();
});
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productsArray.filter((product: Product) =>
      product.ProductName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
