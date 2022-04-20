import { Component, OnInit } from '@angular/core';
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-choise-payment',
  templateUrl: './choise-payment.component.html',
  styleUrls: ['./choise-payment.component.scss']
})
export class ChoisePaymentComponent implements OnInit {

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.updateTotalAmountInCart()
  }

  createReceipt() {

  }
}
