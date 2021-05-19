import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { CarouselItemService } from './core/carousel-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  carouselItems$ = this.carouselItemService
    .fetchCarouselData()
    .pipe(delay(2000));

  constructor(private carouselItemService: CarouselItemService) {}

  title = 'ecommerce-angular';
}
