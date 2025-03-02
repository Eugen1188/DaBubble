import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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

  constructor(public firestore: Firestore) {}

  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.displayName = this.user.displayName;
      this.email = this.user.email;
      this.photoURL = this.user.photoURL;
      this.emailVerified = this.user.emailVerified;
      this.uid = this.user.uid;
    }
  }
}
