import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';


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
  public users: any[] = [];
  active: boolean = false;
  message: boolean = false;
  channels = [
    {
      name: 'Entwicklerteam'
    },
    {
      name: 'Backoffice'
    },
    {
      name: 'Support'
    },

  ]


  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    console.log(this.firestore);
    const usersCollection = collection(this.firestore, 'users');
    console.log(usersCollection);
    const userSnapshot = await getDocs(usersCollection);
    console.log(userSnapshot);
    this.users = userSnapshot.docs.map(doc => doc.data());

    console.log(this.users);

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
