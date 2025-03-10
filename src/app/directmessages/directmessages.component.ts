import { Component, inject, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-directmessages',
  imports: [],
  templateUrl: './directmessages.component.html',
  styleUrl: './directmessages.component.scss'
})
export class DirectmessagesComponent implements OnInit {
  userService = inject(UserService);
  index: number = -1;
  public users: any[] = [];
  public currentReciever: any = null;
  public currentUser: any = null;
 
  userID: string = '';

  firestore = inject(Firestore);
  text: string = 'hallo';
  constructor() {
  }

  async ngOnInit() {
    this.userID = this.userService.user.uid;
    await this.loadUsers();

  }

  async loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);
    this.users = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.setCurrentReciever();
    this.findcurrentUserinUsers();

  }

  setCurrentReciever() {
    this.userService.currentIndex$.subscribe(index => {
      this.index = index;
    });
    //const storedIndex = localStorage.getItem('currentIndex');
    //this.index = storedIndex ? +storedIndex : -1;
    this.currentReciever = this.users[this.index] || { fullname: 'Unbekannt', messages: [] };
    this.currentReciever.messages.push(this.text);
    console.log(this.currentReciever);

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
