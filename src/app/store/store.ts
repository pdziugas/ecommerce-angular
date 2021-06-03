import { CarouselState } from './carousel/carousel.reducer';
import { ProductsState } from './products/products.reducers';

export interface AppState {
  carouselReducer: CarouselState;
  productsReducer: ProductsState;
}
