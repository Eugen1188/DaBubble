import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider, Auth } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, MatDividerModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  googleAuthProvider = new GoogleAuthProvider();
  auth = inject(Auth);
  constructor(private router: Router) {}

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
