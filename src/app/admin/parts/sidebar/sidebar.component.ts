import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() count: number = 0;

  @Output() changeRoute: EventEmitter<any> = new EventEmitter();
  public roles: any

  @Input() activeRoute: string = "";

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRole()
  }

  getRole() {
    let token = localStorage.getItem("Authorization")
    // @ts-ignore
    let tokenObject = this.jwtHelper.decodeToken(token)
    this.roles = tokenObject.roles
  }

  changeActiveRoute(route: string) {
    this.changeRoute.emit(route)
    this.activeRoute = route;
  }

}
