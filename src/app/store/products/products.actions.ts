import { createAction, props } from '@ngrx/store';
import { IProduct } from '../models/product-item.model';

export const productsActions = {
  load: createAction('[PRODUCTS] REQUEST'),
  success: createAction(
    '[PRODUCTS] SUCCESS',
    props<{ productList: IProduct[] }>()
  ),
  fail: createAction('[PRODUCTS] FAIL', props<{ errorMessage: undefined }>()),
};
