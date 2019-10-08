import { OrderService } from './../../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Cart } from './cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { DataSharingService } from 'src/app/shared/datasharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private cartService: CartService, private route: ActivatedRoute, private toastr: ToastrService,private dataShare: DataSharingService,
              private orderService: OrderService, private router: Router) { }

  cartItems: Cart[]=[];
CartId: number;
amount;


ngOnInit() {
    this.cartService.getCart().subscribe((response: any) => {
      this.cartItems = response;
      console.log(response);
      this.amount = this.cartItems
      .map(item => item.Amount)
      .reduce((prev, next) => prev + next);
      console.log(this.amount);
    }, err => {
      console.log(err);
    });



  }


  getCartItems() {
    this.cartService.getCart().subscribe((response: any) => {
      this.cartItems = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }
  // sendResponse(): void {
  //   this.dataShare.sendData(this.cartItems);
  // }

  deleteFromCart(cartId: number) {

    const ans =  confirm('Do you want to Delete this item ?');
    if (ans) {

      this.cartService.removeFromCart(cartId)
      .subscribe((res) => {

        this.toastr.error('Deleted !');

        this.cartItems.pop();
        this.dataShare.notifyIfItemRemoved(this.cartItems.length);

      });

  }
  }

  proceedToCheckout() {
    this.router.navigateByUrl('/address');
  }


}

