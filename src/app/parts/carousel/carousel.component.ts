import {Component, Input, OnInit} from '@angular/core';

interface carouselImage {
  url: ""
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  @Input() images: carouselImage[] = []
  selectIndex = 0
  indicators = true
  sliderInterval = 6000


  constructor() {
  }

  ngOnInit(): void {
    this.autoSlideImages()
  }

  autoSlideImages(): void {
    setInterval(() => {
        this.onNextClick();
      },
      this.sliderInterval)
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
