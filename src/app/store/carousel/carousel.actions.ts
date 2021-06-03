import { createAction, props } from '@ngrx/store';
import { ICarouselItem } from '../models/carousel-item.model';

export const carouselActions = {
  load: createAction('[CAROUSEL] REQUEST'),
  success: createAction(
    '[CAROUSEL] SUCCESS',
    props<{ carouselItems: ICarouselItem[] }>()
  ),
  fail: createAction('[CAROUSEL] FAIL', props<{ errorMessage: undefined }>()),
};
