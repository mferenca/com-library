export class PaginatorProperties {
  first: number;
  page: number;
  reserved: boolean;
  search: string;
  totalPages: number;

  constructor(public size: number = 10) {
    this.page = 0;
    this.search = '';
    this.reserved = false;
  }
}
