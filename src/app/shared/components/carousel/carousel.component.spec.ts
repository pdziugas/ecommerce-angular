import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselItemService } from 'src/app/core/carousel-item.service';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let httpClient: HttpClientTestingModule;
  let service: CarouselItemService;
  let httpMock: HttpTestingController;
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [CarouselComponent],
  //     providers: [
  //       {
  //         provide: CarouselItemService,
  //       },
  //     ],
  //   }).compileComponents();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CarouselComponent],
      providers: [CarouselItemService],
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
});
