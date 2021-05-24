import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  private readonly productsEndpoint = 'http://localhost:3000/products';

  fetchProductData = () => {
    return this.httpClient.get<IProduct[]>(this.productsEndpoint);
  };

  fetchItemData = (index: string) => {
    return this.httpClient.get<IProduct>(`${this.productsEndpoint}/${index}`);
  };

  postItemData = (item: object) => {
    return this.httpClient.post<IProduct>(this.productsEndpoint, item);
  };

  editItemData = (item: object, index: number) => {
    return this.httpClient.put<IProduct>(
      `${this.productsEndpoint}/${index}`,
      item
    );
  };

  deleteItemData = (index: number) => {
    return this.httpClient.delete<IProduct>(
      `${this.productsEndpoint}/${index}`
    );
  };
}
