import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { CarouselItemService } from '../../../core/carousel-item.service';
import { IProduct, ProductsService } from '../../../core/products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  carouselItems$ = this.carouselItemService
    .fetchCarouselData()
    .pipe(delay(2000));

  @Input() items: IProduct[] = [];

  catalogItems$ = this.productsService.fetchProductData().pipe(delay(2000));

  // reactive form
  form = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  refreshItems$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.catalogItems$ = this.refreshItems$.pipe(
      switchMap(() => this.productsService.fetchProductData())
    );
  }

  onFormSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.productsService.postItemData(this.form.value).subscribe((item) => {
        this.items.push(item);
      });
      // this.catalogItems$ = this.refreshItems$.pipe(
      //   switchMap(() => this.productsService.fetchProductData())
      // );

      this.refreshItems$.next(false);

      this.form.reset();
    }
  }

  constructor(
    private carouselItemService: CarouselItemService,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}
}
