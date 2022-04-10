import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @Output() changeRoute: EventEmitter<any> = new EventEmitter();
  public createUserForm = new FormGroup({
    firstname: new FormControl(),
    username: new FormControl(),
    lastname: new FormControl(),
    patronymic: new FormControl(),
    password: new FormControl(),
    phoneNumber: new FormControl()
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifyService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  createUser() {
    this.apiService.createAdminUser({...this.createUserForm.value})
      .subscribe(res => {
        this.notifyService.showSuccess("Create successfully!")
        this.changeRoute.emit("userList")
      }, () => {
        this.notifyService.showError("Creation error!")
      })
  }

  changeActiveRoute(route: string) {
    this.changeRoute.emit(route)
  }
}
