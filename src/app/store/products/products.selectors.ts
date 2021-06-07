import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducers';

export const selectProductsState =
  createFeatureSelector<ProductsState>('productsReducer');

export const selectProductList = createSelector(
  selectProductsState,
  (state) => state.productList
);

export const selectProductListLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductListFail = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectProduct = createSelector(
  selectProductsState,
  (state) => state.product
);
