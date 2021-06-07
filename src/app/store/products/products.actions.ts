import { createAction, props } from '@ngrx/store';
import { IProduct } from '../models/product-item.model';

export enum productActionTypes {
  PRODUCT_LIST_LOAD = '[PRODUCT_LIST] LOAD_REQUEST',
  PRODUCT_LIST_LOAD_SUCCESS = '[PRODUCT_LIST] LOAD_SUCCESS',
  PRODUCT_LIST_LOAD_FAIL = '[PRODUCT_LIST] LOAD_FAIL',
}

// LOAD PRODUCTS [LIST]
export const productsActions = {
  load: createAction(productActionTypes.PRODUCT_LIST_LOAD),
  success: createAction(
    productActionTypes.PRODUCT_LIST_LOAD_SUCCESS,
    props<{ productList: IProduct[] }>()
  ),
  fail: createAction(
    productActionTypes.PRODUCT_LIST_LOAD_FAIL,
    props<{ errorMessage: undefined }>()
  ),
};

// LOAD SINGLE PRODUCT
export const productDetailsActions = {
  detailsLoad: createAction(
    '[PRODUCT_DETAILS] LOAD_REQUEST',
    props<{ id: number }>()
  ),
  detailsSuccess: createAction(
    '[PRODUCT_DETAILS] LOAD_SUCCESS',
    props<{ product: IProduct }>()
  ),
  detailsFail: createAction(
    '[PRODUCT_DETAILS] LOAD_FAIL',
    props<{ errorMessage: undefined }>()
  ),
};

// CREATE / ADD PRODUCT
export const productCreateActions = {
  createRequest: createAction(
    '[PRODUCT_CREATE] REQUEST',
    props<{ product: IProduct }>()
  ),
  createSuccess: createAction(
    '[PRODUCT_CREATE] SUCCESS',
    props<{ product: IProduct }>()
  ),
  createFail: createAction(
    '[PRODUCT_CREATE] FAIL',
    props<{ errorMessage: any }>()
  ),
};

// EDIT PRODUCT
export const productEditActions = {
  editRequest: createAction(
    '[PRODUCT_EDIT] REQUEST',
    props<{ product: IProduct }>()
  ),
  editSuccess: createAction(
    '[PRODUCT_EDIT] SUCCESS',
    props<{ product: IProduct }>()
  ),
  editFail: createAction(
    '[PRODUCT_EDIT] FAIL',
    props<{ errorMessage: undefined }>()
  ),
};

// DELETE PRODUCT
export const productDeleteActions = {
  deleteRequest: createAction(
    '[PRODUCT_DELETE] REQUEST',
    props<{ id: number }>()
  ),
  deleteSuccess: createAction(
    '[PRODUCT_DELETE] SUCCESS',
    props<{ id: number }>()
  ),
  deleteFail: createAction(
    '[PRODUCT_DELETE] FAIL',
    props<{ errorMessage: undefined }>()
  ),
};
