import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  private readonly carouselEndpoint = 'http://localhost:3000/carousel';

  fetchCarouselData = () => {
    return this.httpClient.get<ICarouselItem[]>(this.carouselEndpoint);
  };
}
