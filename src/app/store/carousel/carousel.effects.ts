import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CarouselItemService } from '../../core/carousel-item.service';
import { carouselActions } from './carousel.actions';

@Injectable()
export class CarouselEffects {
  /* Effect decorator allows @ngrx to hadnle the loadCarousel$ Observable 
    and this means we don't have to handle the registrations and subscriptions within the store */
  carousel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carouselActions.load),
      exhaustMap(() => {
        return this.carouselItemService.fetchCarouselData().pipe();
      }),
      map((carouselItems) => carouselActions.success({ carouselItems })),
      catchError((err) =>
        of(carouselActions.fail({ errorMessage: err.message }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private carouselItemService: CarouselItemService
  ) {}
}
