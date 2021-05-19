import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ICarouselItem } from '../../core/carousel-item.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() items!: ICarouselItem[];

  @ViewChild('slides') slides!: ElementRef<HTMLElement>;

  interval = 5000;
  // TODO - need to somehow get actual array length. Would this be a good way to get child count?
  /* 
    // Accessing multiple native DOM elements using QueryList
    @ViewChildren(HelloComponent) myValue: QueryList<HelloComponent>;

    ngAfterViewInit() {
     console.log("Hello ", this.myValue);
    }
  */
  // basically I would need to create a component for slides
  slidesCount = 3;
  maxLeftSlide = this.leftPosition;
  currentSlide = 0;
  slidesLeftStyleValue = 0;

  showNextSlide = () => {
    const shouldRollForward = this.currentSlide > this.maxLeftSlide;
    this.currentSlide += shouldRollForward ? -100 : this.currentSlide * -1;
    this.currentPos;
  };

  showPrevSlide() {
    const shouldRollBack = this.currentSlide < 0;
    this.currentSlide = shouldRollBack
      ? this.currentSlide + 100
      : this.maxLeftSlide;
    this.currentPos;
  }

  autoChange = setInterval(this.showNextSlide, this.interval);

  restartAutoChange() {
    clearInterval(this.autoChange);
    this.autoChange = setInterval(this.showNextSlide, this.interval);
  }

  slidePrevious() {
    this.showPrevSlide();
    this.restartAutoChange();
  }

  slideNext() {
    this.showNextSlide();
    this.restartAutoChange();
  }

  private get leftPosition(): number {
    return (this.slidesCount - 1) * 100 * -1;
  }

  private get currentPos(): number {
    return (this.slidesLeftStyleValue = this.currentSlide);
  }
}
