import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public categoryList: Array<any> = []

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.apiService.getCategoryList().subscribe(res => {
      this.categoryList = res
    }, () => {
      this.router.navigate(['/']).then()
    })
  }

}
