import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { DirectmessagesComponent } from './directmessages/directmessages.component';
import { ChatContentComponent } from './chat-content/chat-content.component';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {
    this.setCurrentUser();
  }
  auth = inject(Auth);
  chatmoduleenabled = false;
  accountcreation = false;
  user: any = new User();
  firestore = inject(Firestore)
  public users: any[] = [];
  private indexSource = new BehaviorSubject<number>(-1);
  currentIndex$ = this.indexSource.asObservable();
  private currentComponent = new BehaviorSubject<any>(null);
  component$ = this.currentComponent.asObservable();
  currentReciever: any;
  currentUser: any;
  component: string = '';

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




  getReciepent(reciever: any, user: any) {
    //this.indexSource.next(reciever);
    this.currentReciever = reciever;
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('currentReceiver', JSON.stringify(this.currentReciever));



  }

 
    loadComponent(component: string) {
 
    this.currentComponent.next(null); // Setze kurzzeitig null
    setTimeout(() => {
      if (component === 'chat') {
        this.currentComponent.next(DirectmessagesComponent); // Lade DirectmessagesComponent nach Timeout
      } else if (component === 'channel') {
        this.currentComponent.next(ChatContentComponent); // Lade ChatContentComponent nach Timeout
      }
    }, 0);
}
}

