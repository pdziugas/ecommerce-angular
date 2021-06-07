import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { ProductsService } from 'src/app/core/products.service';
import {
  productCreateActions,
  productDeleteActions,
  productDetailsActions,
  productEditActions,
  productsActions,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.load),
      exhaustMap(() => {
        return this.productsService.fetchProductData().pipe();
      }),
      map((response) => productsActions.success({ productList: response })),
      catchError((err) =>
        of(productsActions.fail({ errorMessage: err.message }))
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDetailsActions.detailsLoad),
      mergeMap((action) =>
        this.productsService.fetchItemData(action.id).pipe(
          map((product) =>
            productDetailsActions.detailsSuccess({ product: product })
          ),
          catchError((err) =>
            of(productDetailsActions.detailsFail({ errorMessage: err.message }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productCreateActions.createRequest),
      mergeMap((action) =>
        this.productsService.postItemData(action.product).pipe(
          map((product) => productCreateActions.createSuccess({ product })),
          catchError((err) =>
            of(productCreateActions.createFail({ errorMessage: err.message }))
          )
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productEditActions.editRequest),
      concatMap((action) =>
        this.productsService.editItemData(action.product).pipe(
          map((product) => productEditActions.editSuccess({ product })),
          catchError((err) =>
            of(productEditActions.editFail({ errorMessage: err.message }))
          )
        )
      ),
      tap(() => this.router.navigate(['']))
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDeleteActions.deleteRequest),
      mergeMap((productId) =>
        this.productsService.deleteItemData(productId.id).pipe(
          map(() => productDeleteActions.deleteSuccess({ id: productId.id })),
          catchError((err) =>
            of(productDeleteActions.deleteFail({ errorMessage: err.message }))
          )
        )
      )
    )
  );
}
