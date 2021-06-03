import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ICarouselItem } from '../../../store/models/carousel-item.model';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  const ui = {
    get slidePrevious() {
      return fixture.debugElement.query(By.css('.prev')).nativeElement;
    },
    get slideNext() {
      return fixture.debugElement.query(By.css('.next')).nativeElement;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    component.carouselItems = [
      { title: 'Phones' },
      { title: 'PCs' },
    ] as ICarouselItem[];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show carousel items when loaded', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.textContent).toContain('Phones');
  });

  it('should showNextSlide() on next click', () => {
    spyOn(component, 'slideNext').and.callThrough();
    ui.slideNext.click();

    expect(component.slideNext).toHaveBeenCalled();
  });

  it('should showPreviousSlide() on previous click', () => {
    spyOn(component, 'slidePrevious').and.callThrough();
    ui.slidePrevious.click();

    expect(component.slidePrevious).toHaveBeenCalled();
  });
});
