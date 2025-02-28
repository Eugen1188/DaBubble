import { Component } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { getAuth, updatePassword } from 'firebase/auth';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent {
  users = new User();
  auth = getAuth();
  currentUser = this.auth.currentUser;
  newPassword = this.users.password;

  async onSubmit(emailform: NgForm) {
    if (this.currentUser) {
      try {
        await updatePassword(this.currentUser, this.newPassword);
        console.log('Password changed successfully');
        emailform.reset();
      } catch (error) {
        console.error('Error changing password:', error);
      }
    } else {
      console.error('No user is currently signed in');
    }
  }
}
