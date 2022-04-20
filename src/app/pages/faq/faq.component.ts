import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.updateTotalAmountInCart()
  }

}
