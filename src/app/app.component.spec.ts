import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ecommerce-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ecommerce-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'ecommerce-angular app is running!'
    );
  });
});

// describe("testing tests", () => {
//   let fixture: ComponentFixture<AppComponent>
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations:[AppComponent, HelloComponent],
//       // providers: [NumberService]  // or
//       providers: [{
//         provide: NumberService,

//         useValue: {genereateANumber: () => 100}
//       }]
//     });
//     // const component = TestBed.createComponent(AppComponent);
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();  // detect changes paleidzia dar ngOnInit metoda
//   });

//   console.log(fixture.nativeElement)  // laiko visa html

//   it('should succeed', () => {
//     fixture.detectChanges();  // detect changes paleidzia dar ngOnInit metoda
//     expect(fixture.nativeElement.textContent).toContain('Hello')
//   })

//   it('should use a number service to generate a number', () => {
//     const NumberService = TestBed.inject(NumberService)
//     spyOn(numberService, 'generateANumber').and.callThrough();
//     // console.log(NumberService)
//     fixture.detectChanges();  // detect changes paleidzia dar ngOnInit metoda
//     expect(fixture.componentInstance.fieldAfterInit).toBe(100);
//     expect(NumberService.generateANumber).toHaveBeenCalled();
//   })
// })
