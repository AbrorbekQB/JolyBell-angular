import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() productCost: any
  @Input() id: any
  @Input() imgURL: any
  @Input() productName: any

  constructor() { }

  ngOnInit(): void {
  }

}
