import { Component, OnInit } from '@angular/core';
import { BookService} from '../common/books.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  constructor(private bookService: BookService) { }

  getNumberOfBooksInCart() {
    return this.bookService.getCart().length;
  }

}
