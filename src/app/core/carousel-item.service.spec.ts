import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CarouselItemService, ICarouselItem } from './carousel-item.service';

describe('Carousel-Item Service', () => {
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
    let expectedItems: ICarouselItem[];

    beforeEach(() => {
      carouselItemService = TestBed.inject(CarouselItemService);
      expectedItems = [
        {
          id: 1,
          title: 'Phones',
          category: 'phones',
          description: 'Look around and shop for phones',
          imageUrl: 'https://placeimg.com/1280/300/tech/1',
        },
        {
          id: 2,
          title: 'Computers',
          category: 'computers',
          description: 'Look around and shop for computers.',
          imageUrl: 'https://placeimg.com/1280/300/tech/2',
        },
        {
          id: 3,
          title: 'Accessories',
          category: 'accessories',
          description: 'Shop for necessary tech accessories.',
          imageUrl: 'https://placeimg.com/1280/300/tech/3',
        },
      ] as ICarouselItem[];
    });

    it('should return expectedItems', () => {
      carouselItemService
        .fetchCarouselData()
        .subscribe((carouselItems) =>
          expect(carouselItems).toEqual(expectedItems)
        );

      // CarouselItemService should have made one request to GET items
      const req = httpTestingController.expectOne(
        carouselItemService.carouselEndpoint
      );
      expect(req.request.method).toEqual('GET');

      // respond with the mock heroes
      req.flush(expectedItems);
    });

    it('should be OK returning no items', () => {
      carouselItemService
        .fetchCarouselData()
        .subscribe((items) => expect(items.length).toEqual(0));

      const req = httpTestingController.expectOne(
        carouselItemService.carouselEndpoint
      );
      req.flush([]);
    });
  });
});
