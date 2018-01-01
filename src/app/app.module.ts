import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }        from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { BookService} from './common/books.service';
import { Routing } from "./app.routing";
import { BookComponent } from './book/book.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterPageComponent,
    HeaderPageComponent,
    NavBarComponent,
    CartComponent,
    HomeComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
