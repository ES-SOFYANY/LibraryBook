import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class CartService {
  constructor(private http:HttpClient) {
  }

  getBestCommercialOffer(cartBooks) {
    let ids = this.getIdsOfBooksStringFormat(cartBooks);
    let url = '/api/' + ids + '/commercialOffers';
    return this.http.get<any>(url).pipe(
      map(response => {
        let listOffers = response.offers;
        return this.calculateBestOffer(listOffers, cartBooks);
      }));
  }

  calculateBestOffer(listOffers, cartBooks) {
    let listValuesOfDifferentCommercialOffers = [];
    let sumPriceOfBookCart = this.getSumPriceOfBookCart(cartBooks);
    listOffers.forEach(offre => {
      if (offre.type === 'percentage') {
        listValuesOfDifferentCommercialOffers[0] = sumPriceOfBookCart * offre.value / 100
      }
      if (offre.type === 'minus') {
        listValuesOfDifferentCommercialOffers[1] = offre.value
      }
      if (offre.type === 'slice') {
        listValuesOfDifferentCommercialOffers[2] = Math.trunc(sumPriceOfBookCart / offre.sliceValue) * offre.value
      }
    })
    let bestCommercialOffer = sumPriceOfBookCart - Math.max(...listValuesOfDifferentCommercialOffers);
    return bestCommercialOffer;
  }

  getSumPriceOfBookCart(cartBooks) {
    let sumPriceOfBookCart = cartBooks.reduce(function (a, b) {
      return a + b.price
    }, 0)
    return sumPriceOfBookCart;
  }

  getIdsOfBooksStringFormat(books) {
    return books.map(book => {
      return book.isbn
    }).toString();
  }
}
