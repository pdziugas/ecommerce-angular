import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselItemService } from 'src/app/core/carousel-item.service';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let httpClient: HttpClientTestingModule;
  let service: CarouselItemService;
  let httpMock: HttpTestingController;
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let renderedHtml: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CarouselComponent],
      providers: [CarouselItemService],
      // providers: [
      // {
      // provide: CarouselItemService,
      // useValue: { fetchCarouselData: () => data, randomMockField: data },
      // },
      // ],
    }).compileComponents();

    service = TestBed.inject(CarouselItemService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  // it('carousel should have controls', () => {
  //   expect(
  //     renderedHtml.query(By.css('.controls')).nativeElement.innerText
  //   ).toBe('.controls');
  //   expect(renderedHtml.query(By.css('.controls')).nativeElement);
  // });
});
