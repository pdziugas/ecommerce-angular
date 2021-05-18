import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CarouselComponent } from './modules/components/carousel/carousel.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './modules/components/catalog/catalog.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    LoaderComponent,
    CatalogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
