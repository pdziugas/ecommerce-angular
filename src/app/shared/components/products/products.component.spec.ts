import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '../../../store/models/product-item.model';
import { EditItemComponent } from '../../pages/edit-item/edit-item.component';
import { ProductComponent } from './products.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let expectedItem: IProduct;

  const ui = {
    get deleteButton() {
      return fixture.debugElement.query(By.css('.btn--delete')).nativeElement;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent, EditItemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.productList = [
      {
        title: 'testItem1',
        description: 'testItem1 testItem1 testItem1',
        price: 2000,
        imageUrl: 'https://placeimg.com/135/180/tech/1',
        id: 1,
      },
      {
        title: 'testItem2',
        description: 'testItem2 testItem2 testItem2',
        price: 1000,
        imageUrl: 'https://placeimg.com/135/180/tech/1',
        id: 2,
      },
    ];

    expectedItem = {
      title: 'testItem1',
      description: 'testItem1 testItem1 testItem1',
      price: 2000,
      imageUrl: 'https://placeimg.com/135/180/tech/1',
      id: 1,
    } as IProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show product items when loaded', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.textContent).toContain('testItem1');
    expect(compiled.textContent).toContain(2000);
  });

  it('should show delete confirmation dialog when clicked', () => {
    spyOn(window, 'confirm');

    ui.deleteButton.click();

    expect(ui.deleteButton.textContent).toContain('Delete');
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this item?'
    );
  });

  it('should call deleteProduct() when confirmed', () => {
    const nextSpy = jasmine.createSpy();
    component.itemDelete.subscribe(nextSpy);
    component.deleteProduct(expectedItem);
    expect(nextSpy).toHaveBeenCalled();

    // alternative way
    spyOn(component.itemDelete, 'emit');
    component.deleteProduct(expectedItem);
    expect(component.itemDelete.emit).toHaveBeenCalledWith(expectedItem);
  });
});
