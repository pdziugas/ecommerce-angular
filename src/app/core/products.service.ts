import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../store/models/product-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  readonly productsEndpoint = 'http://localhost:3000/products';

  fetchProductData(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.productsEndpoint);
  }

  fetchItemData(index: IProduct['id']): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.productsEndpoint}/${index}`);
  }

  postItemData(item: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.productsEndpoint, item);
  }

  editItemData(item: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(
      `${this.productsEndpoint}/${item.id}`,
      item
    );
  }

  deleteItemData(index: IProduct['id']): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(
      `${this.productsEndpoint}/${index}`
    );
  }
}
