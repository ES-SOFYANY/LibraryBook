import {Component, OnInit} from '@angular/core';
import {BookService} from "../common/books.service";
import {CartService} from "./cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [CartService]
})
export class CartComponent implements OnInit {

  bestCommercialOffer: number;

  constructor(private bookService:BookService, private carteService: CartService) {
  }

  ngOnInit() {
    this.carteService.getBestCommercialOffer(this.getBookOfCart())
      .subscribe(bestOffer=> {
      this.bestCommercialOffer = bestOffer;
    });
  }

  getBookOfCart() {
    return this.bookService.getCart();
  }

  getSumPriceOfBookCart(){
    return this.carteService.getSumPriceOfBookCart(this.getBookOfCart());
  }


}
