import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/core/products.service';
import { ProductsService } from '../../../core/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() items: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  editProduct(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: number) {
    let confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation == true) {
      this.productService.deleteItemData(id).subscribe(() => {
        this.items = this.items.filter((item) => item.id !== id);
      });
    }
  }
}
