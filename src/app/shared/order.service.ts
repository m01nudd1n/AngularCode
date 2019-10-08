import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  private accessPointUrl = 'http://localhost:5000/api/order/';

  placeOrder(order) {
    return this.http.post(this.accessPointUrl, order);
  }

  getOrders(id){
    return this.http.get(this.accessPointUrl + id);
  }

  // AddDetailsOfOrder(orderDetails) {
  //   return this.http.post('http://localhost:5000/api/orderdetails/', orderDetails);
  // }
}
