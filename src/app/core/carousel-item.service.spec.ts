import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CarouselItemService } from './carousel-item.service';

describe('carousel-item service', () => {
  let service: CarouselItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [CarouselItemService],
    });
    service = TestBed.inject(CarouselItemService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
