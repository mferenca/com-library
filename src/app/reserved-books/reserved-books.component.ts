import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/models/book';
import { BooksService } from '../shared/services/books.service';
import { ReservedBooksService } from '../shared/services/reserved-books.service';

@Component({
  selector: 'app-reserved-books',
  templateUrl: './reserved-books.component.html',
  styleUrls: ['./reserved-books.component.css']
})
export class ReservedBooksComponent implements OnInit {
  public book: Book;

  public books: Book[];

  public display: boolean;

  constructor(
    private booksService: BooksService,
    private reservedBooksService: ReservedBooksService
  ) {}

  ngOnInit() {
    this.getReservedBooks();
  }

  public openModal(book: Book) {
    this.display = true;

    this.book = book;
  }

  public cancelReservation() {
    this.display = false;

    this.booksService.cancelReservation(this.book).subscribe(() => {
      this.getReservedBooks();
    });
  }

  private getReservedBooks() {
    this.reservedBooksService
      .getReservedBooks()
      .subscribe(books => (this.books = books));
  }
}
