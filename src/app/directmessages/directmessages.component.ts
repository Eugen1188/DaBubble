import { Component, inject } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-directmessages',
  imports: [],
  templateUrl: './directmessages.component.html',
  styleUrl: './directmessages.component.scss'
})
export class DirectmessagesComponent {
  userService = inject(UserService);
  index: number = -1;
  users: any[] = [];
  currentReciever: any;
  currentUser: any;
  currentUserName: any = this.userService.user.displayName;
  userID: string = this.userService.user.uid;

  firestore = inject(Firestore);
  text:string='hallo';
  constructor() {}

  async ngOnInit() {
    await this.loadUsers();
    this.findcurrentUserinUsers();
    this.setCurrentReciever();

  }

  setCurrentReciever(){
    this.userService.currentIndex$.subscribe(index => {
      this.index = index;
    });
    this.currentReciever = this.users[this.index];
    this.currentReciever.messages.push(this.text);
    console.log(this.currentReciever);

  }

  async loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);
    this.users = userSnapshot.docs.map(doc => ({
      id: doc.id,      
      ...doc.data()     
    }));
   
  }

  findcurrentUserinUsers() {
    this.users.forEach(user => {
      if (this.userID === user.id) {
        console.log(user.id);
        console.log(this.userService.user.uid);
        this.currentUser = user;
        console.log(this.currentUser);
      }
    });
  }














}
