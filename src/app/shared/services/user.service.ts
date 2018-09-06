import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private user$: BehaviorSubject<User | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.user$ = new BehaviorSubject(this.getLoggedUser());
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const foundUser = users.find(user => user.id === id);

        if (foundUser) {
          return foundUser;
        } else {
          throw new Error('Logged user not found in the database');
        }
      })
    );
  }

  public getUserByUsername(username: string): Observable<User | undefined> {
    return this.httpClient
      .get<User[]>(this.apiUrl)
      .pipe(map(users => users.find(user => user.username === username)));
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient
      .put<User[]>(this.apiUrl, user, {
        headers: this.headers
      })
      .pipe(map(() => user));
  }

  public reserveBook(bookId: number) {
    const userId = this.getLoggedUser().id;

    this.getUserById(userId).subscribe(user => {
      user.books.push(bookId);

      this.updateUser(user).subscribe();
    });
  }

  public cancelReservation(bookId: number) {
    const userId = this.getLoggedUser().id;

    this.getUserById(userId).subscribe(user => {
      user.books = user.books.filter(book => book !== bookId);

      this.updateUser(user).subscribe();
    });
  }

  public getLoggedUser(): User | null {
    const localUser = localStorage.getItem('user');

    if (localUser) {
      return <User>JSON.parse(localUser);
    } else {
      this.router.navigateByUrl('/login');

      return null;
    }
  }

  public setUser(user: User | null) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

  public checkPassword(password1: string, password2: string) {
    return password1 === password2;
  }

  public getUserSubject() {
    return this.user$;
  }
}
