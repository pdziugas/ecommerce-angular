import { TestBed } from '@angular/core/testing';

import { CarouselItemService } from './carousel-item.service';

describe('CarouselItemService', () => {
  let service: CarouselItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
