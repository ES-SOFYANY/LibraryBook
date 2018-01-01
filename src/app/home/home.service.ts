import {Injectable} from '@angular/core';
import {Book} from '../common/book.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(private http:HttpClient) {
  }


  getBooks() {
    return this.http.get<Book[]>('/api').pipe(
      map(res => res));
  }
}
