import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from '../models/book';
import { BooksService } from './books.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedBooksService {
  constructor(
    private booksService: BooksService,
    private userService: UserService
  ) {}

  public getReservedBooks(): Observable<Book[]> {
    const books: Book[] = [];

    const id = this.userService.getLoggedUser().id;

    this.userService.getUserById(id).subscribe(user => {
      user.books.forEach(bookId => {
        this.booksService.getBook(bookId).subscribe(book => {
          books.push(book);
        });
      });
    });

    return of(books);
  }
}
