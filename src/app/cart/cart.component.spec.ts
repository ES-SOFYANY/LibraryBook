import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {offers} from './offersMock';
import {Book} from '../common/book.model';
import { CartComponent } from './cart.component';
import {CartService} from "./cart.service";
import {BookService} from '../common/books.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let httpMock;
  let cartService;
  let bookService;
  let componentHTML;
  let observale;
  let book1 = new Book('id1', 'Henri Potier', 35, 'http://exemple.fr/hp0.jpg', ['description 1: le mot à recherche pour tester la fonction de recherche est #chercheMoi', 'description 1', 'description 1']);
  let book2 = new Book('id2', 'Henri Potier', 30, 'http://exemple.fr/hp0.jpg', ['description 1', 'description 1', 'description 1']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [CartService, BookService],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = fixture.debugElement.injector.get(CartService);
    bookService = fixture.debugElement.injector.get(BookService);
    httpMock = fixture.debugElement.injector.get(HttpTestingController);
    componentHTML = fixture.debugElement;
    observale = new Observable(function (observer) {
      observer.next(offers.offer1);
      observer.complete();
    });
    fixture.detectChanges();
  });


  it('getBestCommercialOffer of cartService should be called after ngOnInit', () => {
    spyOn(cartService, 'getBestCommercialOffer').and.returnValue(observale);
    expect(cartService.getBestCommercialOffer).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(cartService.getBestCommercialOffer).toHaveBeenCalled();
  });

  it('The price of cart should be 65€ ', () => {
    bookService.addBookToCart(book1).addBookToCart(book2);
    expect(component.getSumPriceOfBookCart()).toEqual(65);
  });

  it('getIdsOfBooksStringFormat should return string ids of two books separated by commas "id1,id2"', () => {
    expect(cartService.getIdsOfBooksStringFormat([book1, book2])).toEqual('id1,id2');
  });

  it('the commercial offer should be 50 ( offer minus )', () => {
    expect(cartService.calculateBestOffer(offers.offers1, [book1, book2])).toEqual(50);
  });

  it('the commercial offer should be 32,5 ( offer pourcentage )', () => {
    expect(cartService.calculateBestOffer(offers.offers2, [book1, book2])).toEqual(32.5);
  });

  it('the commercial offer should be 45 ( offer slice )', () => {
    expect(cartService.calculateBestOffer(offers.offers3, [book1, book2])).toEqual(45);
  });


});
