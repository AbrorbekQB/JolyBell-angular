import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-orders-checkout',
  templateUrl: './orders-checkout.component.html',
  styleUrls: ['./orders-checkout.component.scss']
})
export class OrdersCheckoutComponent implements OnInit {
  // @ts-ignore
  public orderId: string = localStorage.getItem("cartId")
  public orderDetails: any = {
    orderItems: []
  }
  public promocodeForm = new FormGroup({
    code: new FormControl('')
  })

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
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      });
    }
  }

  checkPromoCode() {
    this.apiService.checkPromocode(this.promocodeForm.value.code, this.orderId)
      .subscribe(res => {
        if (res.active) {
          this.notifyService.showSuccess("Success!")
          if (this.orderId) {
            this.apiService.getOrderById(this.orderId).subscribe(res => {
              this.orderDetails = res
              console.log(res)
            });
          }
        } else {
          this.notifyService.showError("Error!")
        }
      }, error => {
        this.notifyService.showError(`Not found Promocode`)
      })
  }
}
