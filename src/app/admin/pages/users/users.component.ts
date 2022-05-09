import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utils} from "../../../shared/services/Utils";
import {NotificationService} from "../../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public userList: any = {
    data: []
  }
  public modalState: any = ""
  public param: any
  public totalLength: any
  page: number = 1

  public activeRoute: string = ""

  public searchForm = new FormGroup({
    search: new FormControl('')
  })


  constructor(private router: Router,
              private apiService: ApiService,
              private jwtHelper: JwtHelperService,
              private utils: Utils,
              private notify: NotificationService) {
  }

  openModal(state: string, param: any) {
    this.modalState = state;
    this.param = param
    document.body.style.overflow = 'hidden'
  }

  closeModal() {
    this.modalState = ''
    document.body.style.overflow = ''
  }

  ngOnInit(): void {
    this.utils.checkAuthenticated()
    this.updateUserList()
  }

  updateUserList() {
    this.apiService.getAllUser(this.searchForm.value.search, this.page).subscribe(res => {
      this.userList = res
      this.totalLength = res.totalCount
    })
  }

  changeRoute(activeRoute: string) {
    this.activeRoute = activeRoute;
    this.updateUserList()
  }

  changeActiveUser(param: any) {
    this.apiService.changeActiveUser(param).subscribe(res => {
      this.notify.showSuccess("Successfully update")
      this.updateUserList()
    }, () => {
      this.notify.showError("Error updating")
      this.updateUserList()
    })
  }

  searching() {
    this.updateUserList()
  }
}
