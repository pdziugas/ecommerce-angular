import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../store/models/product-item.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductComponent {
  @Input() productList: IProduct[] = [];
  @Output() itemEdit = new EventEmitter<IProduct>();
  @Output() itemDelete = new EventEmitter<IProduct>();

  deleteProduct(product: IProduct): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation === true) {
      this.itemDelete.emit(product);
    }
  }
}
