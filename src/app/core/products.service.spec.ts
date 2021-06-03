import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductsService, IProduct } from './products.service';

describe('ProductsService', () => {
  let httpTestingController: HttpTestingController;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    productsService = TestBed.inject(ProductsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('fetchProductData()', () => {
    it('should make a GET request and return an array', async () => {
      const response = productsService.fetchProductData().toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/products'
      );

      expect(request.request.method).toBe('GET');
      request.flush([]);
      expect(await response).toEqual([]);
    });
  });

  describe('fetchItemData()', () => {
    let expectedItem: IProduct;

    beforeEach(() => {
      expectedItem = {} as IProduct;
    });

    it('should make a GET request and return an object', async () => {
      const response = productsService.fetchItemData(1).toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/products/1'
      );

      expect(request.request.method).toBe('GET');
      request.flush({});
      expect(await response).toEqual(expectedItem);
    });
  });

  describe('postItemData()', () => {
    let expectedItem: IProduct;

    beforeEach(() => {
      expectedItem = {} as IProduct;
    });

    it('should make a POST request', async () => {
      const response = productsService.postItemData(expectedItem).toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/products'
      );

      expect(request.request.method).toBe('POST');
      request.flush(expectedItem);
      expect(await response).toEqual(expectedItem);
    });
  });

  describe('editItemData()', () => {
    let updatedItem: IProduct;

    beforeEach(() => {
      updatedItem = {
        id: 6,
        title: 'iPhone 6',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 700,
        imageUrl: 'https://placeimg.com/135/180/tech/6',
      } as IProduct;
    });

    it('should make a PUT request', async () => {
      const response = productsService.editItemData(updatedItem).toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/products/6'
      );

      expect(request.request.method).toBe('PUT');
      request.flush(updatedItem);
      expect(await response).toEqual(updatedItem);
    });
  });

  describe('deleteItemData()', () => {
    let itemToDelete: IProduct;

    beforeEach(() => {
      itemToDelete = {} as IProduct;
    });

    it('should make a DELETE request', async () => {
      const response = productsService.deleteItemData(1).toPromise();
      const request = httpTestingController.expectOne(
        'http://localhost:3000/products/1'
      );

      expect(request.request.method).toBe('DELETE');
      request.flush(itemToDelete);
      expect(await response).toEqual(itemToDelete);
    });
  });
});
