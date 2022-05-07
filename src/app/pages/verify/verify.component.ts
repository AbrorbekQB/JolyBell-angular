import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  public verifyUserForm: FormGroup = new FormGroup({
    confirmCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
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
    if (!localStorage.getItem("verify"))
      this.router.navigate(['/']).then()
  }

  verifyUserFunc() {
    this.apiService.verifyForgot(this.verifyUserForm.value.confirmCode, this.verifyUserForm.value.password).subscribe(res => {
      localStorage.removeItem("verify")
      this.notifyService.showSuccess("Successfully updated password!")
      this.router.navigate(['/']).then()
    }, () => {
      this.notifyService.showError("Error updating password!")
      // this.router.navigate(['/']).then()
    })
    console.log(this.verifyUserForm.value)
  }

  returnHomePage() {
    this.router.navigate(['/']).then()
  }
}
