import { createReducer, on } from '@ngrx/store';
import { carouselActions } from '../carousel/carousel.actions';
import { IProduct } from '../models/product-item.model';
import { productsActions } from './products.actions';

export interface ProductsState {
  productList: IProduct[];
  loading: boolean;
  error?: Error;
}

const initialState: ProductsState = {
  productList: [],
  loading: false,
  error: undefined,
};

export const productsReducer = createReducer(
  initialState,
  on(productsActions.load, (state) => ({ ...state, loading: true })),
  on(productsActions.success, (state, { productList }) => ({
    ...state,
    productList,
    loading: false,
  })),
  on(carouselActions.fail, (state, err) => ({
    ...state,
    err,
  }))
);
