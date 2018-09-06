import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListViewComponent } from './books-list-view.component';

describe('BooksListViewComponent', () => {
  let component: BooksListViewComponent;
  let fixture: ComponentFixture<BooksListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
