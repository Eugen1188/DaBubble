import { Component, inject } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

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
  currentRecieverName: string = '';
  currentUserName: string = '';
  firestore = inject(Firestore);
  constructor() {






  }

  async ngOnInit() {
    await this.loadUsers();
    console.log(this.userService.currentIndex$);

    this.userService.currentIndex$.subscribe(index => {
      this.index = index;


      this.currentRecieverName = this.users[this.index].fullname

      this.currentUserName=this.userService.user.displayName

    });
  }

  async loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);
    this.users = userSnapshot.docs.map(doc => doc.data());
    console.log(this.users);

  }
}
