import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../core/products.service';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  productItem$ = this.productsService.fetchItemData(
    this.activedRoute.snapshot.params.id
  );

  editForm = this.fb.group({
    id: [null],
    title: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  onFormSubmit(): void {
    this.productsService.editItemData(this.editForm.value).subscribe(() => {
      alert('data updated successfully');
      this.router.navigate(['']);
    });
  }

  ngOnInit(): void {
    const product = this.activedRoute.snapshot.data.product;
    this.editForm.patchValue({ product });
    this.productsService
      .fetchItemData(this.activedRoute.snapshot.params.id)
      .subscribe((result) => {
        this.editForm.patchValue(result);
      });
  }
}
