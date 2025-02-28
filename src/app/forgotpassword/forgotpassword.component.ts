import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { ShareddataService } from '../shareddata.service';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { RouterLink } from '@angular/router';

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
  user = new User();
  submitted = false;
  accountcreationenabled = inject(ShareddataService);

  auth = getAuth();

  constructor() {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }
  async onSubmit(emailform: NgForm) {
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
      this.submitted = false;
    }, 1000);
  }
}
