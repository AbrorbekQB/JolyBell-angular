import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";
import {CartService} from "../../shared/services/cart.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-paysys',
  templateUrl: './paysys.component.html',
  styleUrls: ['./paysys.component.scss']
})
export class PaysysComponent implements OnInit {
  // @ts-ignore
  public orderId: string = localStorage.getItem("orderId")
  public orderLifeTime: number = 0;
  public orderDetails: any = {
    orderItems: []
  }

  public payForm = new FormGroup({
    cardHolderName: new FormControl('CARDHOLDER NAME'),
    cardNumber: new FormControl('4278000000275400'),
    cardExpire: new FormControl('2702'),
    cardCvc: new FormControl('067')
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService,
    public cartService: CartService) {
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.apiService.getOrderById(this.orderId, 'CHOICE_PAYMENT').subscribe(res => {
        this.orderDetails = res
        this.orderLifeTime = res.orderLifeTime
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])
      }, error => {
        this.router.navigate(['/'])
      });
    }
    this.cartService.updateTotalAmountInCart(this.orderId)
  }

  payOrder() {
    this.apiService.payOrder(this.orderId, this.payForm.value).subscribe(res => {
      this.notifyService.showSuccess("Successfully buy!")
      this.router.navigate(['/your-orders']).then()
    }, error=>{
      this.notifyService.showError("Error pay");
    })
  }
}
