import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {NotificationService} from "../../shared/services/notification.service";
import {Router} from "@angular/router";

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
    private notifyService: NotificationService
  ) {
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.apiService.getOrderById(this.orderId).subscribe(res => {
        this.orderDetails = res
        console.log(res)
        console.log(this.orderDetails.orderItems.size)
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      });
    }
  }

  remove(id: string, productId: string) {
    this.apiService.removeOrderItem({
      orderId: this.orderId,
      productId: productId,
      orderItemId: id
    }).subscribe(() => {
      if (this.orderId) {
        this.apiService.getOrderById(this.orderId).subscribe(res => {
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
    if (localStorage.getItem("Authorization")) {
      this.apiService.getUserDetails().subscribe(res => {
        this.router.navigate(['/order/payment']).then()
        this.notifyService.showSuccess("Order successfully booked!")
      }, () => {
        this.notifyService.showWarning("Sorry! Only Registered user can do booking!")
      })
    } else {
      this.notifyService.showWarning("Sorry! Only Registered user can do booking!")
    }
  }
}
