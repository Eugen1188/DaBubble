import { Component, OnInit, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgClass, NgFor, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-add-channel',
  imports: [CommonModule, FormsModule, NgClass, NgIf, NgFor, MatRadioModule],
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
})
export class AddChannelComponent implements OnInit {
  channelName: string = '';
  channelDescription: string = '';
  selectChannelMember: boolean = false;
  chooseMember: boolean = false;
  auth = getAuth();
  user: User | null = null;
  displayName: string | null = null;
  photoURL: string | null = null;
  uid: string | null = null;
  users: any[] = [];
  selectedUsers: any[] = [];
  filteredUsers: any[] = [];


  constructor(@Inject(PLATFORM_ID) private platformId: Object, public firestore: Firestore) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.loadUsers();
  }

  async loadUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    this.users = querySnapshot.docs.map(doc => doc.data());
    console.log(this.users[0].fullname);
  }

  addUserToSelection(index: number) {
    this.selectedUsers.push(this.users[index]);
    console.log(this.selectedUsers);
  }


  closeScreen() {
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