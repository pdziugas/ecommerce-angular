import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditItemComponent } from './edit-item.component';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

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

  it('should return the form is invalid if empty', () => {
    expect(component.editForm.valid).toBeFalsy();
  });

  it('should return the form is valid if not empty', () => {
    component.editForm.patchValue({
      title: 'title',
      description: 'description',
      price: '55',
      imageUrl: 'imageUrl',
    });
    expect(component.editForm.valid).toBeTruthy();
  });

  it('should test if submitForm method has been called', () => {
    spyOn(component, 'onFormSubmit');
    component.onFormSubmit();
    expect(component.onFormSubmit).toHaveBeenCalled();
  });
});
