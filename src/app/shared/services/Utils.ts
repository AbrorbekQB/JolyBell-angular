import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class Utils {

  constructor(private router: Router,
              private jwtHelper: JwtHelperService) {
  }

  checkAuthenticated() {
    let token = localStorage.getItem("Authorization")
    if (!token || this.jwtHelper.isTokenExpired(token))
      this.router.navigate(['/admin/login']).then()

    // @ts-ignore
    let tokenObject = this.jwtHelper.decodeToken(token)
    if (!(tokenObject.roles.indexOf('ROLE_ADMIN') > -1 || tokenObject.roles.indexOf('ROLE_SUPER_ADMIN') > -1)) {
      localStorage.removeItem("Authorization")
      this.router.navigate(['/admin/login']).then()
    }
  }

  getUser() {
    let token = localStorage.getItem("Authorization")
    // @ts-ignore
    return this.jwtHelper.decodeToken(token)
  }
}
