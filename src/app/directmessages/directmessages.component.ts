import { Component, inject, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectMessage } from '../directmessage.class';
import { FireServiceService } from '../fire-service.service';
import { updateCurrentUser } from 'firebase/auth';

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
  isEmpty: boolean = false;
  isYou: boolean = false;
  isChat: boolean = false;
  constructor() {
  }

  async ngOnInit() {
    this.startChat();
  }

  startChat() {
    if (this.userService.user != null && this.userService.currentReciever != null) {
      this.setCurrentReciever();
      this.loadMessages();
      this.checkReciever();
      this.isChat = true;
    } else {
      this.isChat === false
      console.log('keine User oder Reciever');
    }


  }


  setCurrentReciever() {

    this.currentReciever = this.userService.currentReciever;
    this.currentUser = this.userService.currentUser;


    if (!this.currentReciever || !this.currentUser) {
      console.error('currentReciever oder currentUser sind nicht definiert!');
      return;
    }

    //const storedReceiver = localStorage.getItem('currentReceiver');
    //if (storedReceiver) {
    //this.currentReciever = JSON.parse(storedReceiver);
    //}
    //const storedUser = localStorage.getItem('currentUser');
    //if (storedUser) {
    //this.currentUser = JSON.parse(storedUser);
    //}
  }


  async sendMessage() {
    const message = new DirectMessage(this.currentUser.fullname, this.currentUser.profilephoto, this.message, this.currentUser.id, this.currentReciever.id);
    const messageData = {
      name: message.name,
      photo: message.photo,
      content: message.content,
      time: message.time.toISOString(),
      from: message.from,
      to: message.to
    };
    if (this.currentReciever.id !== this.currentUser.id) {
      this.currentReciever.messages.push(messageData);
    }
    this.currentUser.messages.push(messageData);



    this.isEmpty = false;
    await this.updateUsers();
    this.loadMessages()
  }


  async updateUsers() {
    try {
      const receiverDocRef = doc(this.firestore, `users/${this.currentReciever.id}`);
      const senderDocRef = doc(this.firestore, `users/${this.currentUser.id}`);
      if (this.currentReciever.id !== this.currentUser.id) {
        await updateDoc(receiverDocRef, {
          messages: this.currentReciever.messages
        });
      }
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
      if (this.currentUser.id === this.currentReciever.id) {
        if (message.to === this.currentReciever.id && message.from === this.currentReciever.id) {
          this.currentMessages.push(message);
        }
      } else {
        if (message.to === this.currentReciever.id || message.from === this.currentReciever.id) {
          this.currentMessages.push(message);
        }
      }
    });

    this.sortMessages();
    this.checkMessages();
  }

  sortMessages() {
    this.currentMessages.sort((a: any, b: any) => {
      const timeA = new Date(a.time);
      const timeB = new Date(b.time);
      return timeA.getTime() - timeB.getTime();
    });

  }


  isNewDay(currentMessage: any, previousMessage: any) {
    if (!previousMessage) { return true };
    const currentDate = new Date(currentMessage.time).toDateString();
    const previousDate = new Date(previousMessage.time).toDateString();
    const today = new Date().toDateString();


    return currentDate !== previousDate;

  }

  isUser(message: any) {
    console.log(message.from, this.currentUser.id);
    return message.from === this.currentUser.id

  }

  isToday(date: string) {
    const today = new Date().toDateString();
    const messageDate = new Date(date);
    return today === messageDate.toDateString();

  }

  checkMessages() {
    if (this.currentMessages.length === 0) {
      this.isEmpty = true;
    }
  }

  checkReciever() {
    if (this.currentReciever.id === this.currentUser.id) {
      this.isYou = true;
    } else {
      this.isYou = false;
    }
  }
}
