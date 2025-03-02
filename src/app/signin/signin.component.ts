import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider, Auth } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@firebase/auth';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../shared.service';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, MatDividerModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  disabled = true;
  googleAuthProvider = new GoogleAuthProvider();
  shareddata = inject(UserService);
  auth = inject(Auth);
  user = new User();
  constructor(private router: Router) {}

  async signin() {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.user.email,
        this.user.password
      );
      this.shareddata.redirectiontodashboard();
    } catch (error) {}
  }

  async signinwithgoogle() {
    try {
      await signOut(this.auth); // Ensure session reset
      await signInWithPopup(this.auth, this.googleAuthProvider);
      this.shareddata.redirectiontodashboard();
    } catch (error) {}
  }
}
