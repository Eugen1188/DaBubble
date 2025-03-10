import { Component, inject, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectMessage } from '../directmessage.class';
import { FireServiceService } from '../fire-service.service';
@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-directmessages',
  imports: [CommonModule, FormsModule],
  templateUrl: './directmessages.component.html',
  styleUrl: './directmessages.component.scss'
})
export class DirectmessagesComponent implements OnInit {
  userService = inject(UserService);
  fireService = inject(FireServiceService);
  index: number = -1;
  public users: any[] = [];
  public currentReciever: any = null;
  public currentUser: any = null;
  message: string = '';
  userID: string = '';
  currentMessages: any[] = [];
  firestore = inject(Firestore);
  constructor() {
  }

  async ngOnInit() {


    this.setCurrentReciever();
    this.loadMessages();
  }

  setCurrentReciever() {

    // this.currentReciever=this.userService.currentReciever;
    // this.currentUser=this.userService.currentUser;

    const storedReceiver = localStorage.getItem('currentReceiver');
    if (storedReceiver) {
      this.currentReciever = JSON.parse(storedReceiver);
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }


  async sendMessage() {
    const message = new DirectMessage(this.currentUser.fullname, this.message, this.currentUser.id, this.currentReciever.id);
    const messageData = {
      name:message.name,
      content: message.content,
      time: message.time.toISOString(), 
      from: message.from,
      to: message.to
    };
    this.currentReciever.messages.push(messageData);
    this.currentUser.messages.push(messageData);
    console.log(this.currentReciever);
    console.log(this.currentUser);
    await this.updateUsers();
    this.loadMessages();
  }


  async updateUsers() {
    try {
      const receiverDocRef = doc(this.firestore, `users/${this.currentReciever.id}`); 
      const senderDocRef = doc(this.firestore, `users/${this.currentUser.id}`); 
      await updateDoc(receiverDocRef, {
        messages: this.currentReciever.messages
      });     
      await updateDoc(senderDocRef, {
        messages: this.currentUser.messages
      });
      this.message = '';
    } catch (error) {
      console.error("Fehler beim Speichern der Nachricht: ", error);
    }
  }


  loadMessages() {
    this.currentMessages = [];
    this.currentUser.messages.forEach((message: any) => {
      if (message.to === this.currentReciever.id || message.from === this.currentReciever.id) {
        this.currentMessages.push(message);
      }
    });
    this.currentMessages.sort((a: any, b: any) => {
      const timeA = new Date(a.time);
      const timeB = new Date(b.time);
      return timeA.getTime() - timeB.getTime();
    });

  }
}
