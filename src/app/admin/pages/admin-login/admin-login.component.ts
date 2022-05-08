import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router,
              private apiService: ApiService,
              private notifyService: NotificationService,
              private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      if (this.getTokenDecoded(res.Authorization)) {
        this.router.navigate(['/admin/dashboard']).then()
        localStorage.setItem("Authorization", res.Authorization)
      } else
        this.notifyService.showError("Invalid password or username!")
    }, () => {
      this.notifyService.showError("Invalid password or username!")
    })
  }

  getTokenDecoded(token: string) {
    let tokenObject = this.jwtHelper.decodeToken(token)
    return tokenObject.roles.indexOf('ROLE_ADMIN') > -1 || tokenObject.roles.indexOf('ROLE_SUPER_ADMIN') > -1;
  }
}
