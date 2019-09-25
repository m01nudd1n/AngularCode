import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;
  private accessPointUrl = 'http://localhost:5000/api/products/';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  public getProducts() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});

  }

  public getProduct(id: number) {
    return this.http.get(this.accessPointUrl + id, {headers: this.headers});

  }
  public addProductToDb(product) {
    return this.http.post(this.accessPointUrl, product, {headers: this.headers});
  }
 public deleteProductFromDb(id: number) {
    return this.http.delete(this.accessPointUrl  + id, {headers: this.headers});
  }

  public updateProductInDb(id: number, product) {
    return this.http.put(this.accessPointUrl + id, product);
  }

  public addToCart(id: number, product) {
    return this.http.put(this.accessPointUrl + id, product);
  }
  public getCart() {
    return this.http.get('http://localhost:5000/api/cart', {headers: this.headers});
  }

}
