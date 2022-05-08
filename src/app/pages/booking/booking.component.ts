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
  public fullReserved = true
  public orderLifeTime: number = 0;
  public orderDetails: any = {
    orderItems: []
  }
  public provinceArray: any = []
  public districtArray: any = []


  public promocodeForm = new FormGroup({
    code: new FormControl('')
  })

  public receiverDetailsObject = {
    name: '',
    surname: '',
    patronymic: '',
    phoneNumber: '',
    email: '',
    province: '',
    district: '',
    address: '',
    note: ''
  }

  public receiverDetailsForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    patronymic: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl(''),
    note: new FormControl('')
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
        this.orderLifeTime = res.orderLifeTime
        if (!this.orderDetails.orderItems.length)
          this.router.navigate(['/'])

        this.apiService.getUserDetails().subscribe(res => {
          this.receiverDetailsObject.name = res.firstname
          this.receiverDetailsObject.surname = res.lastname
          this.receiverDetailsObject.patronymic = res.patronymic
          this.receiverDetailsObject.phoneNumber = res.phoneNumber
          this.receiverDetailsObject.email = res.username
          this.receiverDetailsObject.address = res.address
          this.receiverDetailsObject.district = res.district
          this.receiverDetailsObject.province = res.province
          this.receiverDetailsForm.setValue(this.receiverDetailsObject)

          this.provinceList()
          this.districtList(res.province)
        })
      }, error => {
        this.router.navigate(['/'])
      });
    }
    this.cartService.updateTotalAmountInCart(this.orderId)
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
    this.receiverDetailsObject.note = this.receiverDetailsForm.value.note
    // console.log(this.receiverDetailsForm.value)
    this.apiService.checkout(this.receiverDetailsForm.value).subscribe(res => {
      if (res == 'true') {
        this.notifyService.showSuccess("Successfully checked")
        this.router.navigate(['/booking/choice-payment']).then()
      } else {
        this.notifyService.showError("Check error!")
      }
    },)
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

  provinceList() {
    this.apiService.provinceList().subscribe(res => {
      this.provinceArray = res
    })
  }

  districtList(value: any) {
    this.apiService.districtList(value).subscribe(res => {
      this.districtArray = res
    })
  }
}
