import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ShareddataService } from '../shareddata.service';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  user = new User();
  checked = false;
  accountcreationenabled = inject(ShareddataService);
  constructor(public firestore: Firestore) {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }

  async onSubmit(useraccount: NgForm) {
    const userDocRef = doc(this.firestore, `users/${this.user.fullname}`);
    await setDoc(userDocRef, { ...this.user });
    useraccount.reset();
    this.checked = false;
  }
}
