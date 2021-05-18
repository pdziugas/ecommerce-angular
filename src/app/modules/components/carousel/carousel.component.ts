import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CarouselItemService } from '../../../core/carousel-item.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
// styles: ['.slides { left: 0; }']
export class CarouselComponent implements OnInit {
  carouselItems$ = this.carouselItemService
    .fetchCarouselData()
    // .pipe(delay(2000));

  constructor(
    private carouselItemService: CarouselItemService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  // @ViewChild('slides')
  // slides!: ElementRef<HTMLElement>;
  @ViewChild('slides') slides!: ElementRef<HTMLElement>;

  delay = 5000;
  slidesCount = this.slides.childElementCount;
  maxLeftSlide = (this.slidesCount - 1) * 100 * -1;

  currentSlide = 0;

  showNextSlide = () => {
    this.currentSlide +=
      this.currentSlide > this.maxLeftSlide ? -100 : this.currentSlide * -1;
    // this.slides.style.left = this.currentSlide + '%';
    this.slides.style.left = `left: ${this.currentSlide}%`;
  };

  showPrevSlide = () => {
    this.currentSlide =
      this.currentSlide < 0 ? this.currentSlide + 100 : this.maxLeftSlide;
    this.slides.style.left = this.currentSlide + '%';
  };

  autoChange = setInterval(this.showNextSlide, this.delay);

  restartAutoChange = () => {
    clearInterval(this.autoChange);
    this.autoChange = setInterval(this.showNextSlide, this.delay);
  };

  slidePrevious = () => {
    console.log('slide prev');
  };

  slideNext = () => {
    console.log('slide next');
  };

  // loaded$ = this.carouselItems$.pipe(
  //   delay(2000),
  //   map((items) => ({ items }))
  // );

  // shouldLoadItems = false;
}
