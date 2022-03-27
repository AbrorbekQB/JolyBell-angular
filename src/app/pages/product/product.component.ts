import {ThisReceiver} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from "../../shared/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  public takingCareShow = false
  public productId: string = ""
  public formOrder = new FormGroup({
    count: new FormControl(1),
    size: new FormControl('')
  })
  public count: number = 1
  public productDetail: any = {
    name: "",
    cost: "",
    advice: "",
    size: [],
    descriptionItems: [{
      name: ""
    }]
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.productId = data.id
    })
    this.apiService.getById(this.productId).subscribe(res => {
      console.log(res)
      this.productDetail = res

      if (this.productDetail.size.length) {
        this.formOrder.controls['size'].setValue(this.productDetail.size[0].toLowerCase())
      }
    })
  }

  takingCareOpen() {
    document.body.style.overflow = 'hidden'
    this.takingCareShow = true
  }

  takingCareClose() {
    document.body.style.overflow = ''
    this.takingCareShow = false
  }

  addToCart() {
    if (localStorage.getItem('cartId')){
      this.apiService.updateOrder({
        id: localStorage.getItem('cartId'),
        productId: this.productDetail.id,
        ...this.formOrder.value,
        cost: 120000
      }).subscribe(res => {
        console.log(res)
        this.showToasterSuccess("add successfuly!")
      }, error => {
        this.showToasterError("Error add")
      })
      this.apiService.getTotalCostApi(localStorage.getItem('cartId'))
      return
    }
    this.apiService.createOrder({
      id: this.productDetail.id,
      ...this.formOrder.value,
      cost: 120000
    }).subscribe(res => {
      console.log(res)
    }, err => {
      localStorage.setItem('cartId', err.error.text)
    })
  }

  increment() {
    if (this.count <= 20)
      this.count++
    console.log(this.count);
  }

  decrement() {
    if (this.count > 1)
      this.count--
    console.log(this.count);
  }

  showToasterSuccess(message: string){
    this.notifyService.showSuccess(message)
  }

  showToasterError(message: string){
    this.notifyService.showError(message)
  }

  showToasterInfo(message: string){
    this.notifyService.showInfo(message)
  }

  showToasterWarning(message: string){
    this.notifyService.showWarning(message)
  }

}
