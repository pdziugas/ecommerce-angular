import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICarouselItem } from 'src/app/core/carousel-item.service';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

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
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show carousel items when loaded', () => {
    const compiled = fixture.nativeElement;

    fixture.detectChanges();

    expect(compiled.textContent).toContain('Phones');
  });
});
