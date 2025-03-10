import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { UserService } from '../shared.service';
import { getAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-contactbar',
  imports: [CommonModule],
  templateUrl: './contactbar.component.html',
  styleUrl: './contactbar.component.scss'
})

@Injectable({
  providedIn: 'root'
})


export class ContactbarComponent {
  constructor(@Inject(Firestore) private firestore: Firestore) { }
  public channels: any[] = [];
  public users: any[] = [];
  active: boolean = false;
  message: boolean = false;
  userService = inject(UserService)
  currentUser: any;
  currentReciever: any;
  userID: string = '';
  auth=getAuth();
  async ngOnInit() {
    await this.loadUsers();
    await this.loadChannels();
    if (this.auth) {
      this.userID = this.userService.user.uid
    }
   
  }

  async loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);
    this.users = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(this.users);
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
    this.users.forEach(user => {
      if (this.userID === user.id) {
        this.currentUser = user;
      }
    })
    this.currentReciever = this.users[index]
    this.userService.getReciepent(this.currentReciever, this.currentUser);

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
