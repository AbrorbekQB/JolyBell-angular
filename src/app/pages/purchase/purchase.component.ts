import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {NotificationService} from "../../shared/services/notification.service";
import {Router} from "@angular/router";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  public orderId = localStorage.getItem("cartId")
  public orderDetails: any = {
    orderItems: []
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService,
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.apiService.getOrderById(this.orderId, 'PENDING').subscribe(res => {
        this.orderDetails = res
        console.log(res)
        console.log(this.orderDetails.orderItems.size)
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      }, error => {
      });
    } else {
      this.router.navigate(['/'])
    }
    this.cartService.updateTotalAmountInCart('')
  }

  remove(id: string, productId: string) {
    this.apiService.removeOrderItem({
      orderId: this.orderId,
      productId: productId,
      orderItemId: id
    }).subscribe(() => {
      if (this.orderId) {
        this.cartService.updateTotalAmountInCart('')
        this.apiService.getOrderById(this.orderId, 'PENDING').subscribe(res => {
          this.orderDetails = res
          console.log(res)
          console.log(this.orderDetails.orderItems.length)
          if (!this.orderDetails.orderItems.length)
            this.router.navigate(['/'])
        });
      }
    })
  }

  bookedOrder() {
    if (localStorage.getItem("Authorization") && localStorage.getItem("cartId")) {
      this.apiService.getUserDetails().subscribe(res => {

        this.apiService.orderConfirm(localStorage.getItem("cartId")).subscribe(res => {
            if (res === 'true') {
              this.router.navigate([`/booking/details`]).then()
              this.notifyService.showSuccess("Order successfully booked!")
            } else {
              this.router.navigate([`/booking/details`]).then()
              this.notifyService.showWarning("The order was not complete!")
            }
            localStorage.setItem("orderId", <string>localStorage.getItem("cartId"))
            localStorage.removeItem("cartId")
          }, error => {
            this.router.navigate([`/`]).then()
            localStorage.removeItem("cartId")
            this.notifyService.showWarning("Error in booking!")
          }
        )
      }, () => {
        this.notifyService.showWarning("Sorry! Only Registered user can do booking!")
      })
    } else {
      this.notifyService.showWarning("Sorry! Only Registered user can do booking!")
    }
  }
}
