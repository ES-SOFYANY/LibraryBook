import {async, ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {HomeService} from './home.service';
import {BookService} from '../common/books.service';
import {Observable} from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Book} from '../common/book.model';

import {HomeComponent} from './home.component';
import {BookComponent} from '../book/book.component';

describe('HomeComponent', () => {
  let component:HomeComponent;
  let fixture:ComponentFixture<HomeComponent>;
  let componentHTML;
  let homeService;
  let bookService;
  let observale;
  let httpMock:HttpTestingController;
  let book1 = new Book('id1', 'Henri Potier', 35, 'http://exemple.fr/hp0.jpg', ['description 1: le mot à recherche pour tester la fonction de recherche est #chercheMoi', 'description 1', 'description 1']);
  let book2 = new Book('id1', 'Henri Potier', 30, 'http://exemple.fr/hp0.jpg', ['description 1', 'description 1', 'description 1']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, BookComponent],
      providers: [HomeService, BookService],
      imports: [
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    homeService = fixture.debugElement.injector.get(HomeService);
    bookService = fixture.debugElement.injector.get(BookService);
    httpMock = fixture.debugElement.injector.get(HttpTestingController);
    componentHTML = fixture.debugElement;
    observale = new Observable(function (observer) {
      observer.next([book1, book2]);
      observer.complete();
    });

    fixture.detectChanges();

  });

  it('getBooks of homeService should be called after ngOnInit', () => {
    spyOn(homeService, 'getBooks').and.returnValue(observale);
    expect(homeService.getBooks).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(homeService.getBooks).toHaveBeenCalled();
  });

  it('number of books should be 2', async(() => {
    spyOn(homeService, 'getBooks').and.returnValue(observale);
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.getSearchedBooks().length).toEqual(2);
    });
  }));

  it('the function ckeckIfStringContainsSearchInput should return true', async(() => {
    bookService.searchInput = "search";
    expect(component.ckeckIfStringContainsSearchInput('test search')).toEqual(true);
  }));

  it('the function ckeckIfStringContainsSearchInput should return false', async(() => {
    bookService.searchInput = "search";
    expect(component.ckeckIfStringContainsSearchInput('test test')).toEqual(false);
  }));

  it('the function checkIfSearchInputexistInAttributsOfBook should return true', async(() => {
    bookService.searchInput = "#chercheMoi";
    expect(component.checkIfSearchInputexistInAttributsOfBook(book1)).toEqual(true);
  }));

  it('the function checkIfSearchInputexistInAttributsOfBook should return false', async(() => {
    bookService.searchInput = "#chercheMoi";
    expect(component.checkIfSearchInputexistInAttributsOfBook(book2)).toEqual(false);
  }));

  it('the number of books found should be one', async(() => {
    bookService.searchInput = "#chercheMoi";
    spyOn(homeService, 'getBooks').and.returnValue(observale);
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.getSearchedBooks().length).toEqual(1);
    });
  }));

  it('the number of books found should be 0', async(() => {
    bookService.searchInput = "#chercheMoi1";
    spyOn(homeService, 'getBooks').and.returnValue(observale);
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.getSearchedBooks().length).toEqual(0);
    });
  }));

});
