import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditItemComponent } from './edit-item.component';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

  const ui = {
    get formSubmitButton() {
      return fixture.debugElement
        .query(By.css('.button-submit'))
        .triggerEventHandler('click', {});
      // .triggerEventHandler('submit', {})
    },
    get formSubmitBtnNativeElement() {
      return fixture.debugElement.query(By.css('.button-submit')).nativeElement;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditItemComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO test: "Expected spy onFormSubmit to have been called."
  fit('should test if submitForm method has been called', fakeAsync(() => {
    spyOn(component, 'onFormSubmit').and.callThrough();
    component.editForm.patchValue({
      title: 'asdfdsf',
      description: 'sadfasdf',
      price: '55',
      imageUrl: 'adsfdas',
    });

    ui.formSubmitButton;
    console.log(component.editForm.valid, '😀😀😀😀😀😀😀😀');
    // ui.formSubmitBtnNativeElement.click();
    tick();
    fixture.detectChanges();
    // expect(component.onFormSubmit).toHaveBeenCalledTimes(1);
    expect(component.onFormSubmit).toHaveBeenCalled();
    component.onFormSubmit();
  }));
});
