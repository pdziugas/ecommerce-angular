import { createReducer, on } from '@ngrx/store';
import { carouselActions } from './carousel.actions';
import { ICarouselItem } from '../models/carousel-item.model';

export interface CarouselState {
  carouselItems: ICarouselItem[];
  loading: boolean;
  error?: Error;
}

const initialState: CarouselState = {
  carouselItems: [],
  loading: false,
  error: undefined,
};

export const carouselReducer = createReducer(
  initialState,
  on(carouselActions.load, (state) => ({ ...state, loading: true })),
  on(carouselActions.success, (state, { carouselItems }) => ({
    ...state,
    carouselItems,
    loading: false,
  })),
  on(carouselActions.fail, (state, err) => ({
    ...state,
    err,
  }))
);
