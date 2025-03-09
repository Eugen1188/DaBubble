import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {
    this.setCurrentUser();
  }
  auth = inject(Auth);
  chatmoduleenabled = false;
  accountcreation = false;
  user: any = new User();

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  redirectiontodashboard() {
    this.router.navigate(['/chat']);
  }

  redirectiontologinpage() {
    this.router.navigate(['/main']);
  }

  continue() {
    this.router.navigate(['/avatarselection']);
  }

  setCurrentUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        console.log('User is still logged in:', user);
      } else {
        this.user = null;
        console.log('User is logged out');
      }
    });
  }

  
}
