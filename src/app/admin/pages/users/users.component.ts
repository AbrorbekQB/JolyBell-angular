import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utils} from "../../../shared/services/Utils";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public userList: any = {
    data: []
  }

  public activeRoute: string = ""

  constructor(private router: Router,
              private apiService: ApiService,
              private jwtHelper: JwtHelperService,
              private utils: Utils) {
  }

  ngOnInit(): void {
    this.utils.checkAuthenticated()
    this.apiService.getAllUser().subscribe(res => {
      this.userList = res
      console.log(res)
    })
  }

  changeRoute(activeRoute: string) {
    this.activeRoute = activeRoute;
    this.apiService.getAllUser().subscribe(res => {
      this.userList = res
    })
  }
}
