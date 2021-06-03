import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './shared/components/products/products.component';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditItemComponent } from './shared/pages/edit-item/edit-item.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CarouselEffects } from './store/carousel/carousel.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { carouselReducer } from './store/carousel/carousel.reducer';
import { productsReducer } from './store/products/products.reducers';
import { ProductsEffects } from './store/products/products.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    LoaderComponent,
    ProductComponent,
    HomepageComponent,
    EditItemComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      carouselReducer: carouselReducer,
      productsReducer: productsReducer,
    }),
    EffectsModule.forRoot([CarouselEffects, ProductsEffects]),
    StoreDevtoolsModule.instrument({ name: 'eCommerce-Angular' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
