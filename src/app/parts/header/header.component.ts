import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from 'src/app/shared/services/api.service';
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public categoryList: Array<any> = []
  public profilePopupShow = false
  public invalidLogin = false
  public signupShow = false
  public forgotPassword = false
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  public formForgot: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email])
  })
  public signupFrom: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getCategoryList().subscribe(res => {
      console.log(res);

      this.categoryList = res
    }, err => {
      this.router.navigate(['/']).then()
    })
    if (localStorage.getItem('cartId')) {
      this.cartService.getTotalCost(localStorage.getItem('cartId'))
    }
  }

  profilePopup() {
    document.body.style.overflow = 'hidden'
    this.profilePopupShow = true
  }

  login() {
    this.apiService.login(this.form.value.username, this.form.value.password)
      .subscribe(res => {
        console.log(res);
        this.closeModal()
        this.invalidLogin = false
      }, err => {
        this.invalidLogin = true
      })
  }

  forgotPopupOpen() {
    this.forgotPassword = true
    this.profilePopupShow = false
  }

  closeModal() {
    document.body.style.overflow = ''
    this.profilePopupShow = false
    this.forgotPassword = false
    this.signupShow = false
    this.form.reset()
  }

  forgot() {
    this.apiService.forgot(this.formForgot.value.username)
      .subscribe(res => {
        this.closeModal()
        this.forgotPassword = false
      }, err => {

      })
  }

  signUpPopupOpen() {
    document.body.style.overflow = 'hidden'
    this.profilePopupShow = false
    this.signupShow = true
  }
}
