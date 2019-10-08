import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  private accessPointUrl = 'http://localhost:5000/api/address/';

  getAddress(id) {
    return this.http.get(this.accessPointUrl + id);
  }
  addAddress(body) {
    return this.http.post(this.accessPointUrl, body);
  }


}
