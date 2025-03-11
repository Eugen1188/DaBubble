import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
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
      const usersCollection = collection(this.firestore, 'users');
      const userSnapshot = await getDocs(usersCollection);
      this.users = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(this.users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async loadChannels() {
    const channelCollection = collection(this.firestore, 'channels');
    const channelSnapshot = await getDocs(channelCollection);
    this.channels = channelSnapshot.docs.map(doc => doc.data());
    console.log(this.channels);

  }

  setcurrentUser() {

  }

  openPersonalChat(index: any) {
if (this.userService.user.uid) {
  this.userID = this.userService.user.uid

  this.currentUser = this.users.find(user => this.userID === user.id);
  this.currentReciever = this.users[index]
  this.userService.getReciepent(this.currentReciever, this.currentUser);
}else{
  console.log('users wurde nicht richtig geladen');
  
}
  

    // this.currentUser = this.userService.user;
    //const reciever = this.users[index];
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
}
