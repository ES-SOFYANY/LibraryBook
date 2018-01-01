import { Component, OnInit } from '@angular/core';
import {BookService} from '../common/books.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html'
})
export class HeaderPageComponent implements OnInit {
  search: string = "";
  constructor(private bookService:BookService) { }

  ngOnInit() {
    this.bookService.setSearchInput(this.search);
  }
  triggerChange(){
    this.bookService.setSearchInput(this.search);
  }
}
