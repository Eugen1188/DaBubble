import { Component, OnInit } from '@angular/core';
import { getAuth, User } from 'firebase/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  auth = getAuth();
  user: User | null = null;
  displayName: string | null = null;
  email: string | null = null;
  photoURL: string | null = null;
  emailVerified: boolean = false;
  uid: string | null = null;

  ngOnInit() {
    this.user = this.auth.currentUser;
    console.log(this.user);

    if (this.user) {
      this.displayName = this.user.displayName;
      this.email = this.user.email;
      this.photoURL = this.user.photoURL;
      this.emailVerified = this.user.emailVerified;
      this.uid = this.user.uid;
      console.log(this.user);
    }
  }
}
