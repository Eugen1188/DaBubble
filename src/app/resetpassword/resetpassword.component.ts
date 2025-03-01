import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import {
  getAuth,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  users = new User(); // User model for holding the new password
  auth: any;
  email: string | null = null; // The email address to be reset

  resetCode = ''; // Variable to store the reset code

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private afApp: FirebaseApp
  ) {}

  ngOnInit() {
    this.auth = getAuth(this.afApp);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.resetCode = params['oobCode'] || ''; 
      if (!this.resetCode) {
        console.error('No reset code found in the URL.');
      }
    });
    verifyPasswordResetCode(this.auth, this.resetCode)
      .then((email) => {
        this.email = email; 
        console.log('Password reset requested by:', email);
      })
      .catch((error) => {
        console.error('Error verifying oobCode:', error);
      });

    console.log(this.auth, this.resetCode, this.users.password);
  }

  async onSubmit(emailform: NgForm) {
    if (this.resetCode && this.users.password) {
      confirmPasswordReset(this.auth, this.resetCode, this.users.password)
        .then(() => {
          console.log('Password reset successful!');
          this.router.navigate(['/main']);
        })
        .catch((error) => {
          console.error('Error resetting password:', error);
        });
      emailform.reset();
    }
  }
}
