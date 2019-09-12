import { ProductService } from './product/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { ProductDetailsComponent } from './product/details/product-details/product-details.component';
import { ProductListComponent } from './product/list/product-list/product-list.component';
import { UpdateProductComponent } from './product/edit/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete/delete-product/delete-product.component';
import { AddProductComponent } from './product/create/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductListComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
