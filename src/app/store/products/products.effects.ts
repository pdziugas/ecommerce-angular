import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/products.service';
import { productsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.load),
      exhaustMap(() => {
        return this.productsService.fetchProductData().pipe();
      }),
      map((productList) => productsActions.success({ productList })),
      catchError((err) =>
        of(productsActions.fail({ errorMessage: err.message }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
