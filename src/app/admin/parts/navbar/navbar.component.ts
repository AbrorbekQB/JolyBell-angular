import {Component, OnInit} from '@angular/core';
import {Utils} from "../../../shared/services/Utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userDetails: any

  constructor(
    private utils: Utils,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userDetails = this.utils.getUser()
    console.log(this.userDetails)
  }

  exit() {
    localStorage.removeItem("Authorization")
    this.router.navigate(['/admin/login']).then()
  }
}
