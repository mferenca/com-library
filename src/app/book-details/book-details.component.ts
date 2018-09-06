import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Book } from '../shared/models/book';
import { BooksService } from '../shared/services/books.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public book: Book;

  public display: boolean;

  public displayWarningModal: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.getBook(+params['id']);
      }
    });
  }

  public reserveBook() {
    const userId = this.userService.getLoggedUser().id;

    this.userService.getUserById(userId).subscribe(user => {
      if (user.books.indexOf(this.book.id) > -1) {
        this.displayWarningModal = true;
      } else {
        this.booksService.reserveBook(this.book).subscribe();
      }
    });

    this.display = false;
  }

  private getBook(id: number) {
    this.booksService.getBook(id).subscribe(book => (this.book = book));
  }
}
