import {Book} from './book.model'

export class BookService {

  private books:Book[] = [];
  private cart:Book[] = [];
  private searchInput:string = "";

  fillListBooks(books:Book[]) {
    this.books = books
  }

  addBookToCart(book:Book) {
    this.cart.push({...book})
    return this;
  }

  clearCart() {
    this.cart = []
  }

  getCart() {
    return this.cart;
  }

  setSearchInput(value) {
    this.searchInput = value;
  }

  getSearchInput() {
    return this.searchInput;
  }
}
