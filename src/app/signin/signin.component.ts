import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider, Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { FormsModule } from '@angular/forms';
import { ShareddataService } from '../shareddata.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, MatDividerModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  disabled = true;
  googleAuthProvider = new GoogleAuthProvider();
  auth = inject(Auth);
  user = new User();
  constructor(private router: Router) {}

  signin() {
    signInWithEmailAndPassword(this.auth, this.user.email, this.user.password);
    this.redirectiontodashboard();
  }

  signinwithgoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then((response) => {
        this.redirectiontodashboard();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  redirectiontodashboard() {
    this.router.navigate(['/user-profile']);
  }
}
