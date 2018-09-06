import { TestBed, inject } from '@angular/core/testing';

import { ReservedBooksService } from './reserved-books.service';

describe('ReservedBooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservedBooksService]
    });
  });

  it('should be created', inject([ReservedBooksService], (service: ReservedBooksService) => {
    expect(service).toBeTruthy();
  }));
});
