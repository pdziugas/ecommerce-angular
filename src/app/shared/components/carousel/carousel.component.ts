import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ICarouselItem } from '../../../store/models/carousel-item.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselItems: ICarouselItem[] = [];
  @ViewChild('slides') slides!: ElementRef<HTMLElement>;
  interval!: number;
  currentSlide!: number;
  slidesLeftStyleValue!: number;
  slidesCount!: number;
  maxLeftSlide!: number;
  autoChange!: any;

  ngOnInit(): void {
    this.interval = 5000;
    this.currentSlide = 0;
    this.slidesLeftStyleValue = 0;
    this.slidesCount = this.carouselLength;
    this.maxLeftSlide = this.leftPosition;
    this.autoChange = setInterval(this.showNextSlide, this.interval);
  }

  showNextSlide(): void {
    const shouldRollForward = this.currentSlide > this.maxLeftSlide;
    this.currentSlide += shouldRollForward ? -100 : this.currentSlide * -1;
    this.slidesLeftStyleValue = this.currentSlide;
  }

  showPrevSlide(): void {
    const shouldRollBack = this.currentSlide < 0;
    this.currentSlide = shouldRollBack
      ? this.currentSlide + 100
      : this.maxLeftSlide;
    this.slidesLeftStyleValue = this.currentSlide;
  }

  restartAutoChange(): void {
    clearInterval(this.autoChange);
    this.autoChange = setInterval(this.showNextSlide, this.interval);
  }

  slidePrevious(): void {
    this.showPrevSlide();
    this.restartAutoChange();
  }

  slideNext(): void {
    this.showNextSlide();
    this.restartAutoChange();
  }

  private get leftPosition(): number {
    return (this.carouselLength - 1) * 100 * -1;
  }

  private get carouselLength(): number {
    return this.carouselItems.length;
  }
}
