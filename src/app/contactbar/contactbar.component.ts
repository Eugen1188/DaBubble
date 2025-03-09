import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { UserService } from '../shared.service';
import { user } from '@angular/fire/auth';



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
  public channels: any[] = [];
  active: boolean = false;
  message: boolean = false;
  shareddata = inject(UserService);
  lchannels = [
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


  async ngOnInit() {
    await this.loadUsers();
    await this.loadChannels();
   
  }

  async loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(usersCollection);
    this.users = userSnapshot.docs.map(doc => doc.data());
    console.log(this.users);

  }

  async loadChannels() {
    const channelCollection = collection(this.firestore, 'channels');
    const channelSnapshot = await getDocs(channelCollection);
    this.channels = channelSnapshot.docs.map(doc => doc.data());
    console.log(this.channels);

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
