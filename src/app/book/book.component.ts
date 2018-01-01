import { Component, OnInit, Input  } from '@angular/core';

import {Book} from '../common/book.model'
import { BookService} from '../common/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  constructor(private bookService: BookService) { }

  ngOnInit() {
  }
  addBookToCart(event, book){
    event.preventDefault();
    this.bookService.addBookToCart(book);
  }

}
