import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {FormControl, FormGroup} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utils} from "../../../shared/services/Utils";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: any = {
    data: []
  }
  public page: number = 1
  public provinceList: any
  public date = new Date()
  public now = this.date.toLocaleDateString().split(".").reverse().join("-")
  public date2 = new Date(this.date.getFullYear(), this.date.getMonth() - 1, this.date.getDay() + 1)
  public dateBeforeMonth = this.date2.toLocaleDateString().split(".").reverse().join("-")

  public filterForm: FormGroup = new FormGroup({
    dateTo: new FormControl(this.dateBeforeMonth),
    dateFrom: new FormControl(this.now),
    status: new FormControl('PAY_SUCCESS'),
    state: new FormControl('ALL'),
    province: new FormControl('ALL')
  })

  public searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  constructor(
    private router: Router,
    private apiService: ApiService,
    private notifyService: NotificationService,
    private jwtHelper: JwtHelperService,
    private utils: Utils
  ) {
  }

  ngOnInit(): void {
    this.utils.checkAuthenticated()
    this.updateTable()
    this.apiService.provinceList().subscribe(res => {
      this.provinceList = res
    })
  }

  updateTable() {
    let searchText = ""
    if (this.searchForm.value.search.length >= 3)
      searchText = this.searchForm.value.search

    let filter = {
      search: searchText,
      ...this.filterForm.value
    }
    this.apiService.getOrderListByAdmin(filter, this.page).subscribe(res => {
        this.orders = res;
        console.log(this.orders)
      }
    )
  }

  search() {
    this.updateTable()
  }

  accept(id: string) {
    this.apiService.acceptOrder(id).subscribe(res => {
      this.notifyService.showSuccess("Successfully accepted!")
      this.updateTable()
    }, () => {
      this.notifyService.showError("Error accepting!")
    })
  }
}
