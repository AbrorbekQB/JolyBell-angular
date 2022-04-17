import {Component, Input, OnInit} from '@angular/core';

interface carouselImage {
  url: ""
}

@Component({
  selector: 'app-carousel-admin',
  templateUrl: './carousel-admin.component.html',
  styleUrls: ['./carousel-admin.component.scss']
})
export class CarouselAdminComponent implements OnInit {

  @Input() images: carouselImage[] = []
  selectIndex = 0
  indicators = true


  constructor() {
  }

  ngOnInit(): void {
  }

  selectImage(index
                :
                number
  ) {
    this.selectIndex = index;
  }

  onNextClick() {
    if (this.selectIndex == this.images.length - 1)
      this.selectIndex = 0;
    else
      this.selectIndex++
  }

  onPrevClick() {
    if (this.selectIndex == 0)
      this.selectIndex = this.images.length - 1
    else
      this.selectIndex--
  }

}
