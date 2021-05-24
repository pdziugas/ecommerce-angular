import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/products.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  editForm = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  onFormSubmit() {
    this.productsService
      .editItemData(this.editForm.value, this.route.snapshot.params.id)
      .subscribe(() => {
        alert('data updated successfully');
      });
  }

  ngOnInit(): void {
    this.productsService
      .fetchItemData(this.route.snapshot.params.id)
      .subscribe((result) => {
        this.editForm.patchValue({
          title: result.title,
          description: result.description,
          price: result.price,
          imageUrl: result.imageUrl,
        });
      });
  }
}
