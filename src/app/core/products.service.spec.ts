import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductsService, IProduct } from './products.service';

describe('Products Service', () => {
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
    let expectedItems: IProduct[];

    beforeEach(() => {
      expectedItems = [
        {
          id: 3,
          title: 'HUAWEI 5',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          price: 750,
          imageUrl: 'https://placeimg.com/135/180/tech/3',
        },
        {
          id: 5,
          title: 'iPhone 5s',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          price: 520,
          imageUrl: 'https://placeimg.com/135/180/tech/5',
        },
        {
          id: 6,
          title: 'samsung test items',
          description: 'iPhone description',
          price: 99.99,
          imageUrl: 'https://placeimg.com/135/180/tech/6',
        },
      ] as IProduct[];
    });

    it('should return expectedItems', () => {
      productsService
        .fetchProductData()
        .subscribe((productItems) =>
          expect(productItems).toEqual(expectedItems)
        );

      const getReq = httpTestingController.expectOne(
        productsService.productsEndpoint
      );
      expect(getReq.request.method).toEqual('GET');
    });

    it('should be OK returning no items', () => {
      productsService
        .fetchProductData()
        .subscribe((items) => expect(items.length).toEqual(0));

      const getReq = httpTestingController.expectOne(
        productsService.productsEndpoint
      );
      getReq.flush([]);
    });
  });

  describe('fetchItemData()', () => {
    let expectedItem: IProduct;
    const fetchItemUrl = (index: IProduct['id']) =>
      `${productsService.productsEndpoint}/${index}`;

    beforeEach(() => {
      expectedItem = {
        id: 3,
        title: 'HUAWEI 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 750,
        imageUrl: 'https://placeimg.com/135/180/tech/3',
      } as IProduct;
    });

    it('should return expectedItem', () => {
      productsService
        .fetchItemData(expectedItem.id)
        .subscribe((productItem) => expect(productItem).toEqual(expectedItem));
      const getReq = httpTestingController.expectOne(
        fetchItemUrl(expectedItem.id)
      );
      expect(getReq.request.method).toEqual('GET');
      getReq.flush(expectedItem);
    });
  });

  describe('postItemData()', () => {
    let expectedItem: IProduct;
    const postUrl = () => productsService.productsEndpoint;

    beforeEach(() => {
      expectedItem = {
        id: 5,
        title: 'iPhone 5s',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 520,
        imageUrl: 'https://placeimg.com/135/180/tech/5',
      } as IProduct;
    });

    it('should make a post request and post item data', () => {
      productsService
        .postItemData(expectedItem)
        .subscribe((productItem) => expect(productItem).toEqual(expectedItem));
      const postReq = httpTestingController.expectOne(postUrl());
      expect(postReq.request.method).toEqual('POST');
      postReq.flush(expectedItem);
    });
  });

  describe('editItemData()', () => {
    let updatedItem: IProduct;
    const updateUrl = (id: number) =>
      `${productsService.productsEndpoint}/${id}`;

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

    it('should update item and return it', () => {
      productsService
        .editItemData(updatedItem)
        .subscribe((data) => expect(data).toEqual(updatedItem));

      const putReq = httpTestingController.expectOne(updateUrl(updatedItem.id));
      expect(putReq.request.method).toEqual('PUT');
      expect(putReq.request.body).toEqual(updatedItem);
    });
  });

  // TODO: need to look over how to test delete requests, keeps expecting null
  //   Argument of type '{}' is not assignable to parameter of type 'Expected<IProduct>'.
  xdescribe('deleteItemData()', () => {
    const deleteItemUrl = (index: IProduct['id']) =>
      `${productsService.productsEndpoint}/${index}`;
    let itemToDelete: IProduct;

    beforeEach(() => {
      itemToDelete = {
        id: 3,
        title: 'HUAWEI 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 750,
        imageUrl: 'https://placeimg.com/135/180/tech/3',
      };
    });

    it('should delete item ', () => {
      productsService
        .deleteItemData(itemToDelete.id)
        // .subscribe((data) => expect(data).toEqual(null));
        // .subscribe((data) => expect(data).toEqual({}));
        .subscribe((data) => expect(data).toEqual(itemToDelete));

      const deleteReq = httpTestingController.expectOne(
        deleteItemUrl(itemToDelete.id)
      );
      expect(deleteReq.request.method).toEqual('DELETE');
      expect(deleteReq.request.body).toEqual(itemToDelete);
    });
  });

  xdescribe('deleteItemData2()', () => {
    const deleteItemUrl = (index: IProduct['id']) =>
      `${productsService.productsEndpoint}/${index}`;
    let itemsArray: IProduct[];

    beforeEach(() => {
      itemsArray = [
        {
          id: 3,
          title: 'HUAWEI 5',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          price: 750,
          imageUrl: 'https://placeimg.com/135/180/tech/3',
        },
        {
          id: 4,
          title: 'HUAWEI 4444',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          price: 550,
          imageUrl: 'https://placeimg.com/135/180/tech/4',
        },
        {
          id: 5,
          title: 'HUAWEI 55',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          price: 550,
          imageUrl: 'https://placeimg.com/135/180/tech/5',
        },
      ];
    });

    it('should remove second item from the array', () => {
      productsService
        .deleteItemData(itemsArray[1].id)
        .subscribe((data) =>
          expect(data).toEqual(itemsArray[0], itemsArray[2])
        );

      const deleteReq = httpTestingController.expectOne(
        deleteItemUrl(itemsArray[1].id)
      );
      expect(deleteReq.request.method).toEqual('DELETE');
      expect(deleteReq.request.body).toEqual(itemsArray[1]);
    });
  });
});
