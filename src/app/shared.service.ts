import { Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}
  chatmoduleenabled = false;
  accountcreation = false;
  private user: User = new User();

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  redirectiontodashboard() {
    this.router.navigate(['/user-profile']);
  }

  redirectiontologinpage() {
    this.router.navigate(['/main']);
  }

  continue() {
    this.router.navigate(['/avatarselection']);
  }
}
