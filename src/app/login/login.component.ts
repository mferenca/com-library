import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errorMessage: string;

  public user = new User();

  constructor(private router: Router, private userService: UserService) {}

  public login() {
    this.userService.getUserByUsername(this.user.username).subscribe(user => {
      if (user) {
        if (this.userService.checkPassword(this.user.password, user.password)) {
          this.router.navigateByUrl('dashboard');

          this.userService.setUser(user);
        } else {
          this.errorMessage = 'Incorrect password.';
          console.error('Incorrect password.');
        }
      } else {
        this.errorMessage = 'User with this username does not exist.';
        console.error('User with this username does not exist.');
      }
    });
  }
}
