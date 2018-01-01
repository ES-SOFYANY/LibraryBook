import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BookComponent } from './book.component';
import { BookService} from '../common/books.service';
import { Book} from '../common/book.model';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let componentHTML: DebugElement;
  let book = new Book('id1','Henri Potier', 35, 'http://exemple.fr/hp0.jpg', ['description 1', 'description 1', 'description 1' ]);
  let bookService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [BookService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = book;
    componentHTML = fixture.debugElement;
    bookService = fixture.debugElement.injector.get(BookService);
    fixture.detectChanges();
  });

  it('the price of book should be 35€ ', () => {
    expect(componentHTML.query(By.css('.price-book')).nativeElement.textContent.trim()).toEqual('35€')
  });

  it('the title of book should be "Henri Potier" ', () => {
    expect(componentHTML.query(By.css('.title-book')).nativeElement.textContent.trim()).toEqual('Henri Potier')
  });

  it('the methode addBookToCart should be called after clicking  button" ', () => {
    spyOn(component, 'addBookToCart');
    const link = componentHTML.query(By.css('div.productinfo a'));
    const event = new MouseEvent('click', { bubbles: true });
    link.triggerEventHandler('click', event);
    expect(component.addBookToCart).toHaveBeenCalled();
  });

  it('the methode addBookToCart of service should be called after clicking  button Ajouter au panier" ', () => {
    spyOn(bookService, 'addBookToCart');
    const link = componentHTML.query(By.css('div.productinfo a'));
    const event = new MouseEvent('click', { bubbles: true });
    link.triggerEventHandler('click', event);
    expect(bookService.addBookToCart).toHaveBeenCalledWith(book);
  });

});
