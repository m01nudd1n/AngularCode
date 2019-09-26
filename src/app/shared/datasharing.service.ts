import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cart } from '../product/cart/cart.model';

@Injectable()
export class DataSharingService {

    public isItemAdded: Subject<any> = new Subject<any>();
    public isItemRemoved: Subject<any> = new Subject<any>();
    public search: Subject<any> = new Subject<any>();
    public logout: Subject<any> = new Subject <any>();

    notifyIfItemAdded(actionName: any) {
      debugger
      this.isItemAdded.next(actionName);
  }

  notifyIfItemRemoved(actionName: any) {
    debugger
    this.isItemAdded.next(actionName);
}

notifySearch(actionName: any){
  debugger
  this.search.next(actionName);
}

notifyLogout(actionName: any){
this.logout.next(actionName);
}


//   public isItemAdded = new Subject<any>();

//   sendData(cart: any) {
//     this.isItemAdded.next(cart);
// }

//     getData(): Observable<any> {
//         return  this.isItemAdded.asObservable();
//       }
}
