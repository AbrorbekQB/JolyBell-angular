import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";

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

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
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
