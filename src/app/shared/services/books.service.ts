import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book, BooksPage } from '../models/book';
import { PaginatorProperties } from '../models/paginator-properties';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'api/books';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  public getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiUrl}/${id}`);
  }

  public getBooksPage(properties: PaginatorProperties): Observable<BooksPage> {
    return this.httpClient.get<Book[]>(this.apiUrl).pipe(
      map(books => this.showOnlyAvailableBooks(books, properties)),
      map(books => this.searchBooks(books, properties)),
      map(books => this.mapToBooksPage(books, properties))
    );
  }

  public reserveBook(book: Book): Observable<Book> {
    this.userService.reserveBook(book.id);

    book.quantity--;

    return this.httpClient
      .put<Book>(`${this.apiUrl}`, book, {
        headers: this.headers
      })
      .pipe(map(() => book));
  }

  public cancelReservation(book: Book): Observable<Book> {
    this.userService.cancelReservation(book.id);

    book.quantity++;

    return this.httpClient
      .put<Book>(`${this.apiUrl}`, book, {
        headers: this.headers
      })
      .pipe(map(() => book));
  }

  private searchBooks(books: Book[], props: PaginatorProperties): Book[] {
    return books.filter(book =>
      book.title.toLowerCase().includes(props.search.toLowerCase())
    );
  }

  private showOnlyAvailableBooks(
    books: Book[],
    props: PaginatorProperties
  ): Book[] {
    if (props.reserved) {
      return books.filter(book => book.quantity > 0);
    } else {
      return books;
    }
  }

  private mapToBooksPage(books: Book[], props: PaginatorProperties): BooksPage {
    const booksPage = new BooksPage();

    booksPage.content = books.slice(props.first, (props.page + 1) * props.size);
    booksPage.totalElements = books.length;

    return booksPage;
  }
}
