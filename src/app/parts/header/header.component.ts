import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from 'src/app/shared/services/api.service';
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() updateTotalAmountInCart: EventEmitter<any> = new EventEmitter();
  @Input() public totalAmount: string = "0"

  public categoryList: Array<any> = []
  public profilePopupShow = false
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
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getCategoryList().subscribe(res => {
      // console.log(res);

      this.categoryList = res
    }, err => {
      this.router.navigate(['/']).then()
    })
    if (this.totalAmount === "0")
      this.updateTotalAmountInCart.emit("")
  }

  profilePopup() {
    if (this.hasToken())
      this.router.navigate(['/account']).then()
    else {
      this.profilePopupShow = true
      document.body.style.overflow = 'hidden'
    }
  }

  login() {
    console.log(this.form.value.username, this.form.value.password)
    this.apiService.login(this.form.value.username, this.form.value.password)
      .subscribe(res => {
        this.closeModal()
        localStorage.setItem('Authorization', res.Authorization)
      }, err => {
        this.notifyService.showError("Username or password invalid")
      })
  }

  registration() {
    this.apiService.registration(this.signupFrom.value.username, this.signupFrom.value.password)
      .subscribe(res => {
        this.notifyService.showSuccess("Successfully created user and sent code to your email!")
        this.closeModal()
      }, error => {
        this.notifyService.showError("User creation error!")
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
    this.signupFrom.reset()
    this.formForgot.reset()
  }

  forgot() {
    this.forgotPassword = false
    this.apiService.forgot(this.formForgot.value.username)
      .subscribe(res => {
        this.notifyService.showSuccess("Sent code to " + this.formForgot.value.username)
        localStorage.setItem("verify", "verify")
        this.closeModal()
      }, err => {
        this.notifyService.showError("Sent code error!");
      })
  }

  signUpPopupOpen() {
    document.body.style.overflow = 'hidden'
    this.profilePopupShow = false
    this.signupShow = true
  }

  hasToken() {
    if (localStorage.getItem('Authorization'))
      return true;
    return false;
  }
}
