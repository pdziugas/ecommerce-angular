import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CarouselItemService } from './carousel-item.service';

describe('CarouselItemService', () => {
  let httpTestingController: HttpTestingController;
  let carouselItemService: CarouselItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // import HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [CarouselItemService],
    });
    // inject these as they will be referenced by each test
    httpTestingController = TestBed.inject(HttpTestingController);
    carouselItemService = TestBed.inject(CarouselItemService);
  });

  // after each test, assert that there are no more pending requests
  afterEach(() => {
    httpTestingController.verify();
  });

  describe('fetchCarouselData()', () => {
    it('should make a GET request and return an array', async () => {
      const response = carouselItemService.fetchCarouselData().toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/carousel'
      );

      expect(request.request.method).toBe('GET');
      // respond with the mock []
      // simuliuoja kada grazina itema, galima grazinti errora
      // galima padaryti
      request.flush([]);
      expect(await response).toEqual([]);
    });
  });
});
