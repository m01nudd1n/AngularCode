import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private headers: HttpHeaders;
  private accessPointUrl = 'http://localhost:5000/api/home';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  public getProducts() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});

  }

  public getProduct(id: number) {
    return this.http.get(this.accessPointUrl + id, {headers: this.headers});

  }


  public addToCart(product) {
    console.log(product);
    return this.http.post(this.accessPointUrl, product);

  }

}
