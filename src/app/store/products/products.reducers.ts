import { createReducer, on } from '@ngrx/store';
import {
  productsActions,
  productDetailsActions,
  productCreateActions,
  productDeleteActions,
} from './products.actions';
import { IProduct } from '../models/product-item.model';

import * as ProductActions from './products.actions';

export interface ProductsState {
  productList: IProduct[];
  product?: IProduct;
  loading: boolean;
  error?: Error;
}

const initialProductsState: ProductsState = {
  productList: [],
  product: undefined,
  loading: false,
  error: undefined,
};

export const productsReducer = createReducer(
  initialProductsState,

  // LOAD PRODUCTS [LIST]
  on(productsActions.load, (state) => ({ ...state, loading: true })),
  on(productsActions.success, (state, { productList }) => ({
    ...state,
    productList,
    loading: false,
  })),
  on(productsActions.fail, (state, err) => ({
    ...state,
    err,
  })),

  // LOAD SINGLE PRODUCT
  on(productDetailsActions.detailsLoad, (state) => ({
    ...state,
    loading: true,
  })),
  on(productDetailsActions.detailsSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),
  on(productDetailsActions.detailsFail, (state, err) => ({
    ...state,
    err,
  })),

  // CREATE / ADD PRODUCT
  on(productCreateActions.createRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(productCreateActions.createSuccess, (prevState, { product }) => ({
    ...prevState,
    productList: [...prevState.productList, product],
    loading: false,
  })),
  on(productCreateActions.createFail, (state, err) => ({
    ...state,
    err,
  })),

  // EDIT PRODUCT
  on(ProductActions.productEditActions.editRequest, (state, { product }) => ({
    ...state,
    product,
    loading: true,
  })),
  on(ProductActions.productEditActions.editSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),
  on(ProductActions.productEditActions.editFail, (state, err) => ({
    ...state,
    err,
  })),

  // DELETE PRODUCT
  on(productDeleteActions.deleteRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(productDeleteActions.deleteSuccess, (prevState, { id }) => ({
    ...prevState,
    productList: prevState.productList.filter((product) => product.id !== id),
    loading: false,
  })),
  on(productDeleteActions.deleteFail, (state, err) => ({
    ...state,
    err,
  }))
);
