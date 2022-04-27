import { Component, OnInit } from '@angular/core';
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.updateTotalAmountInCart('')
  }

}
