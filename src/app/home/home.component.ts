import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Book} from '../common/book.model';
import {BookService} from '../common/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  books:Book[] = [];

  constructor(private homeService:HomeService, private bookService:BookService) {
  }

  ngOnInit() {
    this.homeService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  getSearchedBooks(){
    return this.books.filter((book) => {
      return this.checkIfSearchInputexistInAttributsOfBook(book);
    })
  }

  checkIfSearchInputexistInAttributsOfBook(object){
    return Object.values(object).some( attribut => {
      if (typeof attribut === 'object') {
        return this.checkIfSearchInputexistInAttributsOfBook(attribut)
      } else if (typeof attribut === 'string') {
        return this.ckeckIfStringContainsSearchInput(attribut)
      }
    })
  }

  ckeckIfStringContainsSearchInput(value){
    return value.toUpperCase().includes(this.bookService.getSearchInput().toUpperCase())
  }


}
