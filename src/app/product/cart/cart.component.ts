import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private cartService: CartService, private route: ActivatedRoute, private toastr: ToastrService,private dataShare: DataSharingService) { }

  cartItems: Cart[]=[];
CartId: number;



ngOnInit() {
    this.cartService.getCart().subscribe((response: any) => {
      this.cartItems = response;
      console.log(response);
    }, err => {
      console.log(err);
    });



  }


  getCartItems(){
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


}

