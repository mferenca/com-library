import { Component, OnInit } from '@angular/core';

import { BooksPage } from '../shared/models/book';
import { BooksService } from '../shared/services/books.service';
import { PaginatorProperties } from '../shared/models/paginator-properties';

@Component({
  selector: 'app-books-list-view',
  templateUrl: './books-list-view.component.html',
  styleUrls: ['./books-list-view.component.css']
})
export class BooksListViewComponent implements OnInit {
  public booksPage: BooksPage;

  public paginatorProperties = new PaginatorProperties();

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.getBooksPage();
  }

  public getBooksPage() {
    this.booksService
      .getBooksPage(this.paginatorProperties)
      .subscribe(booksPage => {
        this.booksPage = booksPage;
      });
  }

  public paginate(event) {
    this.paginatorProperties.first = event.first;
    this.paginatorProperties.size = event.rows;
    this.paginatorProperties.page = event.page;
    this.paginatorProperties.totalPages = event.pageCount;

    this.getBooksPage();
  }
}
