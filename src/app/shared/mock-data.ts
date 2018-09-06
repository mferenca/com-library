import {
  InMemoryDbService,
  InMemoryBackendConfig
} from 'angular-in-memory-web-api';

import { Book } from './models/book';
import { User } from './models/user';
import { Books } from '../mocks/books';
import { Users } from '../mocks/users';

export class MockData implements InMemoryDbService, InMemoryBackendConfig {
  createDb() {
    const books: Book[] = Books;
    const users: User[] = Users;

    return { books: books, users: users };
  }
}
