import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/core/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() catalogItems: IProduct[] = [];
  @Output() itemEdit = new EventEmitter<IProduct>();
  @Output() itemDelete = new EventEmitter<IProduct>();

  deleteProduct(product: IProduct): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation === true) {
      this.itemDelete.emit(product);
    }
  }
}
