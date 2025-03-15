import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  Injectable
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../models/message.class';
import { updateDoc, arrayUnion, onSnapshot } from '@angular/fire/firestore';
import { FireServiceService } from '../fire-service.service';
import { UserService } from '../shared.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chat-content',
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
  ],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss',
})
export class ChatContentComponent implements OnInit {
  @ViewChild('chatContent') chatContentRef!: ElementRef;
  private subscription?: Subscription;
  fireService: FireServiceService = inject(FireServiceService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  loading: boolean = false;
  menuOpen: boolean = false;
  channels: any = [];
  currentChannel: any = {};
  currentUser: any;
  unsubMessages!: () => void;

  messages: Message[] = [];
  input: string = '';
constructor(){
  this.startChannel();
}
   async ngOnInit() {
    if (!this.userService.auth.currentUser) this.router.navigate(['/main']);
    else {
      this.scrollToBottom();
      this.channels = await this.fireService.getChannels();
      this.currentChannel = this.channels[0];
      this.getMessages();
    }

    this.subscription = this.userService.startLoadingChannel$.subscribe(() => {
      this.startChannel();
    });


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startChannel() {
    console.log('start');
    if (this.userService.user != null && this.userService.currentChannel != null) {
    this.setCurrentChannel();
    console.log(this.currentChannel);
    console.log(this.currentUser);
    
    }else{
      console.log('keine User oder Channel');
    }
  }


  setCurrentChannel() {
    this.currentChannel = this.userService.currentChannel;
    this.currentUser = this.userService.currentUser;
  }


  getMessages(): void {
    let docRef = this.fireService.getDocRef('channels', this.currentChannel.id);
    if (docRef) {
      this.unsubMessages = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          this.messages = docSnap
            .data()
          ['messages'].map((m: Message) => new Message(m));
        } else return;
      });
    }
  }

  buildMessageObject(): {} {
    return {
      message: this.input || '',
      avatar: this.userService.user?.photoURL || '',
      date: new Date().toISOString().split('T')[0],
      name: this.userService.user?.displayName || 'Unbekannt',
      newDay: this.isNewDay(),
      time: (new Date().getHours() + ':' + new Date().getMinutes()).toString(),
    };
  }

  isNewDay(): boolean {
    if (this.messages.length === 0) return true;
    let lastMessage = this.messages[this.messages.length - 1];
    let lastMessageDate = lastMessage.date;
    let todayDate = new Date().toISOString().split('T')[0];

    return lastMessageDate !== todayDate;
  }

  isToday(date: any): boolean {
    if (!date) return false;
    let today = new Date().toISOString().split('T')[0];
    let messageDate = new Date(date).toISOString().split('T')[0];
    return today === messageDate;
  }

  async newMessage() {
    this.loading = true;
    let docRef = this.fireService.getDocRef('channels', this.currentChannel.id);
    if (docRef) {
      await updateDoc(docRef, {
        messages: arrayUnion(new Message(this.buildMessageObject()).toJSON()),
      })
        .then(() => {
          this.loading = false;
          this.scrollToBottom();
          this.input = '';
        })
        .catch((err) => console.error(err));
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContent = this.chatContentRef.nativeElement as HTMLElement;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 0);
  }

  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  editMessage(m: any, i: number) {
    this.menuOpen = false;
    console.log(m, i);
  }

  toggle() {
    this.userService.toggleThread();
  }
}
