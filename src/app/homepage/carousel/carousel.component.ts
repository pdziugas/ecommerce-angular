import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { delay } from 'rxjs/operators';
import { CarouselItemService } from '../../core/carousel-item.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  carouselItems$ = this.carouselItemService
    .fetchCarouselData()
    .pipe(delay(2000));

  constructor(
    private carouselItemService: CarouselItemService,
    private renderer: Renderer2
  ) {}

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
    this.currentSlide +=
      this.currentSlide > this.maxLeftSlide ? -100 : this.currentSlide * -1;
    this.slidesLeftStyleValue = this.currentSlide;
  };

  showPrevSlide = () => {
    this.currentSlide =
      this.currentSlide < 0 ? this.currentSlide + 100 : this.maxLeftSlide;
    this.slidesLeftStyleValue = this.currentSlide;
  };

  autoChange = setInterval(this.showNextSlide, this.interval);

  restartAutoChange = () => {
    clearInterval(this.autoChange);
    this.autoChange = setInterval(this.showNextSlide, this.interval);
  };

  slidePrevious = () => {
    this.showPrevSlide();
    this.restartAutoChange();
  };

  slideNext = () => {
    this.showNextSlide();
    this.restartAutoChange();
  };

  private get leftPosition(): number {
    return (this.slidesCount - 1) * 100 * -1;
  }
}
