export class Book {
  id: number;
  author: string;
  title: string;
  cover: string;
  country: string;
  genre: string;
  originalTitle: string;
  quantity: number;
  year: number;
}

export class BooksPage {
  content: Book[] = [];
  totalElements: number;
}
