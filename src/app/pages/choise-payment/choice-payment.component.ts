import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-choise-payment',
  templateUrl: './choice-payment.component.html',
  styleUrls: ['./choice-payment.component.scss']
})
export class ChoicePaymentComponent implements OnInit {
  // @ts-ignore
  public orderId: string = localStorage.getItem("orderId")
  public fullReserved = true
  public orderLifeTime: number = 0;
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
    this.cartService.updateTotalAmountInCart('')

    if (this.orderId) {
      this.apiService.getOrderById(this.orderId, 'CHECKOUT').subscribe(res => {
        this.orderDetails = res
        this.orderLifeTime = res.orderLifeTime
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      }, error => {
        this.router.navigate(['/'])
      });
    }
    this.cartService.updateTotalAmountInCart('')
  }

  choicePayment(type: string) {
    this.apiService.choicePayment(this.orderId, type).subscribe(res => {
      this.notifyService.showSuccess("Successfully chosen payment type!")
      this.router.navigate(['/paysys']).then()
    }, error => {
      this.notifyService.showError("Choice payment type error!")
    })
  }
}
