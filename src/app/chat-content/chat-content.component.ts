import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../models/message.class';
import { updateDoc, arrayUnion, onSnapshot } from '@angular/fire/firestore';
import { FireServiceService } from '../fire-service.service';
import { UserService } from '../shared.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { error, log } from 'node:console';
import { User } from '../../models/user.class';

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

  fireService: FireServiceService = inject(FireServiceService);
  userService: UserService = inject(UserService);

  loading: boolean = false;
  channels: any = [];
  currentChannel: any = {};

  unsubMessages!: () => void;

  currentMessage: any = new Message();
  messages: Message[] = [];

  input: string = '';

  async ngOnInit() {
    this.scrollToBottom();
    this.channels = await this.fireService.getChannels();
    this.currentChannel = this.channels[0];
    this.getMessages();
  }

  getMessages(): void {
    this.unsubMessages = onSnapshot(
      this.fireService.getDocRef('channels', this.currentChannel.id),
      (docSnap) => {
        if (docSnap.exists()) {
          this.messages = docSnap
            .data()
            ['messages'].map((m: Message) => new Message(m));
        } else return;
      }
    );
  }

  buildMessageObject(): {} {
    return {
      message: this.input || '',
      avatar: this.userService.user?.photoURL || '',
      date: new Date().toISOString().split('T')[0],
      name: this.userService?.user?.displayName || 'Unbekannt',
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

  isToday(date: string) {
    const today = new Date().toDateString();
    const messageDate = new Date(date);
    return today === messageDate.toDateString();
  }

  async newMessage() {
    this.currentMessage = new Message(this.buildMessageObject());
    if (this.userService.user) {
      await updateDoc(
        this.fireService.getDocRef('channels', this.currentChannel.id),
        { messages: arrayUnion(this.currentMessage.toJSON()) }
      )
        .then(() => {
          this.loading = false;
          this.scrollToBottom();
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

  editMessage(m: any, i: number) {
    console.log(m, i);
  }

  toggle() {
    this.userService.toggleThread();
  }
}
