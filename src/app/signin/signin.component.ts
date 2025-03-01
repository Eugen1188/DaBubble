import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider, Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../shared.service';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, MatDividerModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  disabled = true;
  googleAuthProvider = new GoogleAuthProvider();
  shareddata = inject(UserService);
  auth = inject(Auth);
  user = new User();
  constructor(private router: Router) {}

  signin() {
    signInWithEmailAndPassword(this.auth, this.user.email, this.user.password)
      .then((response) => {
        this.shareddata.redirectiontodashboard();
        console.log('logged in');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  signinwithgoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then((response) => {
        this.shareddata.redirectiontodashboard();
        console.log('logged in');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
