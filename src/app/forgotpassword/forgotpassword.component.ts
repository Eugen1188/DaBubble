import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { RouterLink } from '@angular/router';
import { UserService } from '../shared.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  isOverlayActive = false;
  user = new User();
  submitted = false;
  accountcreationenabled = inject(UserService);

  auth = getAuth();

  constructor() {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }
  async onSubmit(emailform: NgForm) {
    this.isOverlayActive = true;
    await sendPasswordResetEmail(this.auth, this.user.email)
      .then(() => {
        console.log('send');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    this.submitted = true;
    emailform.reset();

    setTimeout(() => {
      this.isOverlayActive = false;
      this.submitted = false;
    }, 1500);
  }
}
