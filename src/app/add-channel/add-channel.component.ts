import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { _MatInternalFormField } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { getAuth, User } from 'firebase/auth';


@Component({
  selector: 'app-add-channel',
  imports: [CommonModule, FormsModule, NgClass, NgIf, MatRadioModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss',
})
export class AddChannelComponent {
  channelName: string = '';
  channelDescription: string = '';
  selectChannelMember: boolean = false;
  chooseMember:boolean = false;
  auth = getAuth();
  user: User | null = null;
  displayName: string | null = null;
  photoURL: string | null = null;
  uid: string | null = null;
  users: any[] = [];
//test
  channelUser = new FormControl('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public firestore: Firestore) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.initUser();
    this.loadUsers();
  }

  initUser() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.displayName = this.user.displayName;
      this.photoURL = this.user.photoURL;
      this.uid = this.user.uid;
      console.log('logedin');
    }
  }

  async loadUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    this.users = querySnapshot.docs.map(doc => doc.data());
    console.log(this.users);
  }

  closeScree() {
    console.log('close window');
    
  }

  onSubmit() {
    console.log('submit');
    this.selectChannelMember = true;
    console.log(this.selectChannelMember);
  }

  setChannelMember(value: boolean) {
    this.chooseMember = value;
    console.log(this.chooseMember);
  }

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    if (textarea.scrollHeight > 90) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = '90px';
    }
  }

  expandTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '90px';
    if (textarea.scrollHeight > 90) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  shrinkTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '60px';
  }
}
