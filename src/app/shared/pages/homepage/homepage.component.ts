import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { CarouselItemService } from '../../../core/carousel-item.service';
import { IProduct, ProductsService } from '../../../core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  carouselItems$ = this.carouselItemService
    .fetchCarouselData()
    .pipe(delay(2000));

  refreshItems$ = new BehaviorSubject<void>(undefined);

  catalogItems$ = this.refreshItems$.pipe(
    switchMap(() => this.productsService.fetchProductData())
  );

  // reactive form
  form = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  constructor(
    private carouselItemService: CarouselItemService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

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
