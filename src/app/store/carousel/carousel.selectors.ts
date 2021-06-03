import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarouselState } from './carousel.reducer';

export const selectCarouselState =
  createFeatureSelector<CarouselState>('carouselReducer');

export const selectCarouselItems = createSelector(
  selectCarouselState,
  (state) => state.carouselItems
);

export const selectCarouselLoading = createSelector(
  selectCarouselState,
  (state) => state.loading
);

export const selectCarouselFailure = createSelector(
  selectCarouselState,
  (state) => state.error
);
