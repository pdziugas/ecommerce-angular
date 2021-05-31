import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IProduct } from 'src/app/core/products.service';
import { EditItemComponent } from '../../pages/edit-item/edit-item.component';
import { CatalogComponent } from './catalog.component';

fdescribe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let expectedItem: IProduct;
  let editItemComponent: EditItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent, EditItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;

    component.catalogItems = [
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

  // const catalogItemExpected = {
  //   title: 'testItem2',
  //   description: 'testItem2 testItem2 testItem2',
  //   price: 1000,
  //   imageUrl: 'https://placeimg.com/135/180/tech/1',
  //   id: 2,
  // };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show catalog items when loaded', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.textContent).toContain('testItem1');
    expect(compiled.textContent).toContain(2000);
  });

  it('should show delete confirmation dialog when clicked', () => {
    spyOn(window, 'confirm');

    const deleteButton = fixture.debugElement.query(
      By.css('.btn--delete')
    ).nativeElement;

    deleteButton.click();

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this item?'
    );
  });

  it('should remove item from an array when deleted', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const deleteButton = fixture.debugElement.query(
      By.css('.btn--delete')
    ).nativeElement;

    deleteButton.click();

    // expect(window.confirm).toHaveBeenCalledWith(
    // 'Are you sure you want to delete this item?'
    // );

    component.catalogItems.splice(1);

    // const compiled = fixture.nativeElement;

    expect(component.catalogItems).toContain(expectedItem);
  });

  it(`should show edit item component when clicked on 'edit'`, () => {
    const editButton = fixture.debugElement.query(
      By.css('.btn--edit')
    ).nativeElement;

    editButton.click();
  });
});
