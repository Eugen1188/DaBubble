import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Channel } from '../models/channels.class';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { DirectmessagesComponent } from './directmessages/directmessages.component';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { Message } from '../models/message.class';
import { FireServiceService } from './fire-service.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {
    this.setCurrentUser();
  }
  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  fireService: FireServiceService = inject(FireServiceService);
  chatmoduleenabled = false;
  accountcreation = false;
  user: any = new User();
  public users: any[] = [];
  private indexSource = new BehaviorSubject<number>(-1);
  currentIndex$ = this.indexSource.asObservable();
  private currentComponent = new BehaviorSubject<any>(DirectmessagesComponent);
  component$ = this.currentComponent.asObservable();
  private threadToggleSubject = new Subject<void>();
  threadToggle$ = this.threadToggleSubject.asObservable();
  currentReciever: any;
  currentUser: any;
  component: string = '';

  channels: any = [];
  currentChannel: any;

  messages: any = [];

  unsubChannels!: () => void;
  unsubMessages!: () => void;

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  redirectiontodashboard() {
    this.router.navigate(['/chat']);
  }

  redirectiontologinpage() {
    this.router.navigate(['/main']);
  }

  continue() {
    this.router.navigate(['/avatarselection']);
  }

  setCurrentUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        console.log('User is still logged in:', user);
      } else {
        this.user = null;
        console.log('User is logged out');
      }
    });
  }

  getChannels() {
    this.channels = [];
    this.unsubChannels = onSnapshot(
      this.fireService.getCollectionRef('channels'),
      (colSnap) => {
        this.channels = colSnap.docs.map((colSnap) => ({
          key: colSnap.id,
          data: colSnap.data(),
        }));
        this.currentChannel = this.channels[0];
        console.log(this.currentChannel);
        this.getMessages();
      }
    );
  }

  getMessages() {
    this.currentChannel = this.channels[0];
    this.unsubMessages = onSnapshot(
      this.fireService.getDocRef('channels', this.currentChannel.key),
      (docSnap) => {
        if (docSnap.exists()) {
          this.messages = docSnap
            .data()
            ['messages'].map((m: any) => new Message(m));
        }
      }
    );
  }

  getReciepent(reciever: any, user: any) {
    //this.indexSource.next(reciever);
    this.currentReciever = reciever;
    this.currentUser = user;
  }

  loadComponent(component: string) {
    this.currentComponent.next(null); // Setze kurzzeitig null
    setTimeout(() => {
      if (component === 'chat') {
        this.currentComponent.next(DirectmessagesComponent);
      } else if (component === 'channel') {
        this.currentComponent.next(ChatContentComponent);
      }
    }, 0);
  }

  toggleThread() {
    this.threadToggleSubject.next();
  }
}
