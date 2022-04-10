import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() count: number = 0;

  @Output() changeRoute: EventEmitter<any> = new EventEmitter();


  @Input() activeRoute: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  changeActiveRoute(route: string) {
    this.changeRoute.emit(route)
    this.activeRoute = route;
  }

}
