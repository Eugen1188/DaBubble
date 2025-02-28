import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ShareddataService } from '../shareddata.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  Auth = inject(Auth);
  user = new User();
  checked = false;
  accountcreationenabled = inject(ShareddataService);
  constructor(public firestore: Firestore, private router: Router) {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }

  async onSubmit(useraccount: NgForm) {
    await createUserWithEmailAndPassword(
      this.Auth,
      this.user.email,
      this.user.password
    )
      .then(() => {
        const userDocRef = doc(this.firestore, `users/${this.user.fullname}`);
        return setDoc(userDocRef, { ...this.user });
      })
      .then(() => {
        useraccount.reset();
        this.checked = false;
        this.loggedin();
      })
      .catch((error) => {
        console.log('Error:', error);
        console.log('Email:', this.user.email);
        console.log('Password:', this.user.password);
      });
  }

  loggedin() {
    this.router.navigate(['/user-profile']);
  }
}
