import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './shared/components/catalog/catalog.component';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditItemComponent } from './shared/pages/edit-item/edit-item.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    LoaderComponent,
    CatalogComponent,
    HomepageComponent,
    EditItemComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
