import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  // @ts-ignore
  public orderId: string = localStorage.getItem("orderId")
  public orderDetails: any = {
    orderItems: []
  }
  public promocodeForm = new FormGroup({
    code: new FormControl('')
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService,
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.apiService.getOrderById(this.orderId, 'CONFIRM').subscribe(res => {
        this.orderDetails = res
        console.log(res)
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      }, error => {
        this.router.navigate(['/'])
      });
    }
    this.cartService.updateTotalAmountInCart('')
  }

  checkPromoCode() {
    this.apiService.checkPromocode(this.promocodeForm.value.code, this.orderId)
      .subscribe(res => {
        if (res.active) {
          this.notifyService.showSuccess("Success!")
          if (this.orderId) {
            this.apiService.getOrderById(this.orderId, 'PENDING').subscribe(res => {
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

  checkout() {
    this.router.navigate(['/booking/choice-payment']).then()
  }

  cancelOrder() {
    this.cartService.updateTotalAmountInCart('')
    let orderId = localStorage.getItem("orderId")
    if (orderId) {
      localStorage.removeItem("orderId")
      this.apiService.cancelOrder(orderId).subscribe()
    }
    this.router.navigate(['/']).then()
    this.notifyService.showSuccess("Order successfully canceled!")
  }
}
