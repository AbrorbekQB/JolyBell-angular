import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public personalInfo: any = {
    firstname: "",
    lastname: "",
    patronymic: "",
    phoneNumber: ""
  }
  public personalUpdateForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    surname: new FormControl(''),
    patronymic: new FormControl(''),
    phoneNumber: new FormControl('')
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService,
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getUserDetails().subscribe(res => {
      this.personalInfo = res;
      console.log(res)
    }, error => {
      this.router.navigate(['/']).then()
    })
    this.cartService.updateTotalAmountInCart()
  }

}
