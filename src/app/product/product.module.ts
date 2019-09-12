import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './list/product-list/product-list.component';
import { ProductDetailsComponent } from './details/product-details/product-details.component';
import { AddProductComponent } from './create/add-product/add-product.component';
import { UpdateProductComponent } from './edit/update-product/update-product.component';
import { DeleteProductComponent } from './delete/delete-product/delete-product.component';



@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, AddProductComponent, UpdateProductComponent, DeleteProductComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductListComponent, ProductDetailsComponent, AddProductComponent, UpdateProductComponent, DeleteProductComponent]
})
export class ProductModule { }
