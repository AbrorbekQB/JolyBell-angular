import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.component.html',
  styleUrls: ['./your-orders.component.scss']
})
export class YourOrdersComponent implements OnInit {
  public orderList: any

  constructor(private apiService: ApiService,
              private router: Router,
              private notifyService: NotificationService,
              public cartService: CartService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('Authorization'))
      this.router.navigate(['/']).then()
    this.apiService.getOrderList().subscribe(res => {
        this.orderList = res;
      }, error =>
        this.router.navigate(['/']).then()
    )
  }

}
