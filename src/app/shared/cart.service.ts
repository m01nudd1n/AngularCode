import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private accessPointUrl = 'http://localhost:5000/api/cart/';

  public addToCart(product) {
    console.log(product);
    return this.http.post(this.accessPointUrl, product);

  }

  public getCart() {

    return this.http.get(this.accessPointUrl);

  }

  public removeFromCart(id: number) {
return this.http.delete(this.accessPointUrl + id);
  }

  public addToOrderDetails(id: number) {
    return this.http.post(this.accessPointUrl, id);
  }
}
