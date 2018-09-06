import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public items: MenuItem[];

  public user: User | null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.setItems();

    this.redirectUser();
  }

  private setItems() {
    this.items = [
      {
        label: 'My Books',
        command: () => this.router.navigate(['./my-books'])
      },
      {
        label: 'Logout',
        command: () => this.logout()
      }
    ];
  }

  private logout() {
    this.userService.setUser(null);
  }

  private redirectUser() {
    this.userService.getUserSubject().subscribe(user => {
      this.user = user;

      if (user) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
