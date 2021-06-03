import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  selectCarouselFailure,
  selectCarouselItems,
  selectCarouselLoading,
} from 'src/app/store/carousel/carousel.selectors';
import { productsActions } from 'src/app/store/products/products.actions';
import {
  selectProductList,
  selectProductListFail,
  selectProductListLoading,
  selectProductsState,
} from 'src/app/store/products/products.selectors';
import { ProductsService } from '../../../core/products.service';
import * as CarouselActions from '../../../store/carousel/carousel.actions';
import * as ProductActions from '../../../store/products/products.actions';
import { IProduct } from '../../../store/models/product-item.model';
import { AppState } from '../../../store/store';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  carouselItems$ = this.store.select(selectCarouselItems);
  carouselLoading$ = this.store.select(selectCarouselLoading);
  carouselError$ = this.store.select(selectCarouselFailure);

  productList$ = this.store.select(selectProductList);
  productsLoading$ = this.store.select(selectProductListLoading);
  productsError$ = this.store.select(selectProductListFail);

  ngOnInit() {
    this.store.dispatch(CarouselActions.carouselActions.load());
    this.store.dispatch(ProductActions.productsActions.load());
  }

  refreshItems$ = new BehaviorSubject<void>(undefined);

  // productList$ = this.refreshItems$.pipe(
  //   switchMap(() => this.productsService.fetchProductData())
  // );

  // reactive form
  form = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  onFormSubmit(): void {
    this.productsService.postItemData(this.form.value).subscribe(() => {
      this.refreshItems$.next();
      this.form.reset();
    });
  }

  onDelete(product: IProduct): void {
    this.productsService.deleteItemData(product.id).subscribe(() => {
      this.refreshItems$.next();
    });
  }

  onEdit(product: IProduct): void {
    this.productsService.editItemData(product).subscribe(() => {
      this.refreshItems$.next();
      this.router.navigate(['edit', product.id]);
    });
  }
}
