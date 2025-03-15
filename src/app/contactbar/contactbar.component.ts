import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FireServiceService } from '../fire-service.service';
import { UserService } from '../shared.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contactbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactbar.component.html',
  styleUrl: './contactbar.component.scss'
})
export class ContactbarComponent implements OnInit {
  public channels: any[] = [];
  public users: any[] = [];
  active: boolean = false;
  message: boolean = false;
  userService = inject(UserService);
  firestore = inject(Firestore);
  firestoreService = inject(FireServiceService);
  currentUser: any;
  currentReceiver: any;
  userID: string = '';
  currentChannel: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only run DOM-related code on the browser side
      this.loadData();
    }
  }

  async loadData() {
    try {
      await this.loadUsers();
      await this.loadChannels();
      this.findCurrentUser();
    } catch (error) {
      console.error("Error loading data in component:", error);
    }
  }

  async loadUsers() {
    try {
      this.users = await this.firestoreService.getUsers();
    } catch (error) {
      console.error("Error loading users in component:", error);
    }
  }

  async loadChannels() {
    try {
      this.channels = await this.firestoreService.getChannels();
    } catch (error) {
      console.error("Error loading channels in component:", error);
    }
  }

  findCurrentUser() {
    if (this.userService.user?.uid) {
      this.userID = this.userService.user.uid;
      this.currentUser = this.users.find(user => this.userID === user.id);
    } else {
      console.log('User not loaded correctly');
    }
  }

  openChannel(index: number) {
    this.currentChannel = this.channels[index];
    this.userService.getChannel(this.currentChannel, this.currentUser);
  }

  openPersonalChat(index: number) {
    this.currentReceiver = this.users[index];
    this.userService.getReciepent(this.currentReceiver, this.currentUser);
  }

  toggleActive() {
    this.active = !this.active;
  }

  toggleMessage() {
    this.message = !this.message;
  }

  isOpen() {
    return this.message === true;
  }

  isActive() {
    return this.active === true;
  }

  openWindow(window: string) {
    this.userService.loadComponent(window);
  }
}
