import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './details/product-details/product-details.component';
import { ProductListComponent } from './list/product-list/product-list.component';
import { AddProductComponent } from './create/add-product/add-product.component';
import { UpdateProductComponent } from './edit/update-product/update-product.component';

const routes: Routes = [

  {
    path: 'products',
    component: ProductListComponent
  },


  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },

  {
    path: 'addproduct',
    component: AddProductComponent
  },

  {
    path: 'updateproduct/:id',
    component: UpdateProductComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
