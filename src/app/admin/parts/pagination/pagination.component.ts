import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  // templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  template: `
    <ul>
      <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }">
        ...
      </li>
    </ul>

    <pagination-controls (pageChange)="p = $event"></pagination-controls>
  `
})
export class PaginationComponent implements OnInit {
  public page: number = 1
  public pageCount: number = 10
  public p: number = 1;
  collection: Array<any> = ["", "", ""]

  constructor() {
  }

  ngOnInit(): void {
  }

}
