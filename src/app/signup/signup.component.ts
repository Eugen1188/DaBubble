import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { UserService } from '../shared.service';

@Component({
  selector: 'app-signup',
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  sharedservice = inject(UserService);
  Auth = inject(Auth);
  user = new User();
  checked = false;
  accountcreationenabled = inject(UserService);

  constructor(public firestore: Firestore) {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }

  async onSubmit(useraccount: NgForm) {
    if (useraccount.valid) {
      console.log(this.user);
      this.sharedservice.setUser(this.user);
      this.sharedservice.continue();
      this.checked = false;
      setTimeout(() => {
        useraccount.reset();
      }, 1000);
    }
  }
}
