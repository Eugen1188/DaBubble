import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FireServiceService } from '../fire-service.service';
import { UserService } from '../shared.service';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-contactbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactbar.component.html',
  styleUrl: './contactbar.component.scss'
})



export class ContactbarComponent {
  constructor() { }
  public channels: any[] = [];
  public users: any[] = [];
  active: boolean = false;
  message: boolean = false;
  userService = inject(UserService)
  firestore = inject(Firestore);
  firestoreService = inject(FireServiceService)
  currentUser: any;
  currentReciever: any;
  userID: string = '';
  auth = getAuth();

  async ngOnInit() {
    await this.loadUsers();
    await this.loadChannels();


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


  openPersonalChat(index: any) {
    if (this.userService.user.uid) {
      this.userID = this.userService.user.uid

      this.currentUser = this.users.find(user => this.userID === user.id);
      this.currentReciever = this.users[index]
      this.userService.getReciepent(this.currentReciever, this.currentUser);
    } else {
      console.log('users wurde nicht richtig geladen');

    }

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
    this.userService.loadComponent(window)
  }
}
