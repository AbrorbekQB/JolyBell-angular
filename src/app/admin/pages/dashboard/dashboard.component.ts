import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {ApiService} from "../../../shared/services/api.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../shared/services/notification.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utils} from "../../../shared/services/Utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userReports: any = {
    userCount: {},
    userDaily: {}
  }
  public orderReports: any = {
    finished: "",
    moneyDaily: {},
    orderDaily: {},
    provinceDaily: {data: [], name: []},
    supplier: "",
    userFinish: "",
    warehouse: ""
  }

  constructor(private apiService: ApiService,
              private router: Router,
              private notifyService: NotificationService,
              private jwtHelper: JwtHelperService,
              private utils: Utils) {
  }

  ngOnInit(): void {
    this.utils.checkAuthenticated()
    this.apiService.dashboardUser().subscribe(res => {
      this.userReports = res

      let usersChart = new Chart("usersChart", {
        type: 'line',
        data: {
          labels: this.userReports.userDaily.date.reverse(),
          datasets: [{
            label: 'New users',
            data: this.userReports.userDaily.data.reverse(),
            backgroundColor: '#A2A1D9',
            hoverBorderColor: '#911c1c',
            borderColor: '#A2A1D9',
            borderWidth: 2,
            pointBorderColor: '#911c1c',
            pointBackgroundColor: 'rgba(145,28,28,0)',
            pointHoverBorderColor: '#911c1c',
            pointBorderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })

    this.apiService.dashboardOrder().subscribe(res => {
      this.orderReports = res;

      let ordersChart = new Chart("ordersChart", {
        type: 'line',
        data: {
          labels: this.orderReports.orderDaily.date.reverse(),
          datasets: [{
            label: 'Orders',
            borderWidth: 2,
            data: this.orderReports.orderDaily.data.reverse()
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      let moneyChart = new Chart("moneyChart", {
        type: 'bar',
        data: {
          labels: this.orderReports.moneyDaily.date.reverse(),
          datasets: [{
            label: 'PaySys',
            data: this.orderReports.moneyDaily.data,
            backgroundColor: '#1d408a',
            hoverBorderColor: 'rgba(29,64,138,0.49)',
            hoverBackgroundColor: 'rgba(29,64,138,0.49)',
            borderColor: '#1d408a',
            borderWidth: 2,
          },
            {
              label: 'MasterCard',
              data: this.orderReports.moneyDaily.data.reverse(),
              backgroundColor: '#FF5A00',
              hoverBorderColor: 'rgba(255,90,0,0.76)',
              hoverBackgroundColor: 'rgba(255,90,0,0.76)',
              borderColor: '#FF5A00',
              borderWidth: 2,
            }
          ]
        },
        options: {

          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      });
      let provinceChart = new Chart("provinceChart", {
        type: 'doughnut',
        data: {
          // labels: this.orderReports.orderDaily.date.reverse(),
          labels: this.orderReports.provinceDaily.name,
          datasets: [{
            label: 'Province',
            data: this.orderReports.provinceDaily.data,
            backgroundColor: ['#A2A1D9', '#151441', '#5fb263', '#e32db7'],
            hoverBorderColor: '#911c1c',
            borderColor: '#A2A1D9',
            borderWidth: 2
          }]
        }
      });
    })
  }

}
