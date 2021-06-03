import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICarouselItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarouselItemService {
  constructor(private httpClient: HttpClient) {}

  readonly carouselEndpoint = 'http://localhost:3000/carousel';

  fetchCarouselData(): Observable<ICarouselItem[]> {
    return this.httpClient.get<ICarouselItem[]>(this.carouselEndpoint);
  }
}
