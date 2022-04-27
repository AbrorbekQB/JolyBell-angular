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
  public provinceArray: any = []
  public districtArray: any = []

  public personalInfo: any = {
    firstname: "",
    lastname: "",
    patronymic: "",
    phoneNumber: "",
    province: "",
    district: "",
    address: ""
  }

  public personalUpdateForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    surname: new FormControl(''),
    patronymic: new FormControl(''),
    phoneNumber: new FormControl('')
  })

  public addressForm: FormGroup = new FormGroup({
    province: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl('')
  })

  public changepasswordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
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

      this.provinceList()
      this.districtList(res.province)
      console.log(res)
    }, error => {
      this.router.navigate(['/']).then()
    })
    this.cartService.updateTotalAmountInCart('')
  }

  logout() {
    localStorage.removeItem("Authorization")
    this.router.navigate(['/']).then()
  }

  updatePersonalData() {
    this.updatePersonalInfoObject()
    this.apiService.updatePersonalData(this.personalInfo).subscribe(() => {
      this.notifyService.showSuccess("Successfully updated!")
    }, () => {
      this.notifyService.showError("Update error")
    })
  }

  updatePersonalInfoObject() {
    if (this.personalUpdateForm.value.firstname)
      this.personalInfo.firstname = this.personalUpdateForm.value.firstname;
    if (this.personalUpdateForm.value.surname)
      this.personalInfo.lastname = this.personalUpdateForm.value.surname;
    if (this.personalUpdateForm.value.patronymic)
      this.personalInfo.patronymic = this.personalUpdateForm.value.patronymic;
    if (this.personalUpdateForm.value.phoneNumber)
      this.personalInfo.phoneNumber = this.personalUpdateForm.value.phoneNumber;
    if (this.addressForm.value.province)
      this.personalInfo.province = this.addressForm.value.province
    if (this.addressForm.value.district)
      this.personalInfo.district = this.addressForm.value.district
    if (this.addressForm.value.address)
      this.personalInfo.address = this.addressForm.value.address
  }

  updateAddress() {
    this.updatePersonalInfoObject()
    this.apiService.updateAddress(this.personalInfo).subscribe(res => {
      this.notifyService.showSuccess("Successfuly update")
    }, error => {
      this.notifyService.showError("Update error!")
    })
    console.log(this.personalInfo)
  }

  provinceList() {
    this.apiService.provinceList().subscribe(res => {
      this.provinceArray = res
      console.log(res)
    })
  }

  districtList(value: any) {
    this.apiService.districtList(value).subscribe(res => {
      this.districtArray = res
    })
  }

  changePassword() {
    if (this.changepasswordForm.value.password != this.changepasswordForm.value.confirmPassword)
      this.notifyService.showError("Password is not equal to confirm password")
    this.apiService.changePassword(this.changepasswordForm.value).subscribe(res => {
      this.notifyService.showSuccess("Successfuly update!")
      this.changepasswordForm.reset()
    }, error => {
      this.notifyService.showError("Error change password")
    })
  }
}
