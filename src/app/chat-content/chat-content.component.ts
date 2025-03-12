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
import { onSnapshot, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { FireServiceService } from '../fire-service.service';
import { UserService } from '../shared.service';
import { Output, EventEmitter } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

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
  messages: any = [];
  currentMessage: any = new Message();
  currentChannel: any;
  input: string = '';

  unsubChannels!: () => void;
  unsubMessages!: () => void;

  ngOnInit(): void {
    this.getChannels();
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
    this.unsubMessages = onSnapshot(
      this.fireService.getDocRef('channels', this.currentChannel.key),
      (docSnap) => {
        if (docSnap.exists())
          (this.messages = docSnap
            .data()
            ['messages'].map((m: any) => new Message(m))),
            this.scrollToBottom();
      }
    );
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

  async newMessage() {
    this.currentMessage = new Message(this.buildMessageObject());
    this.currentChannel = this.channels[0];
    console.log(this.currentMessage.toJSON());
    if (this.userService.user) {
      await updateDoc(
        this.fireService.getDocRef('channels', this.currentChannel.key),
        { messages: arrayUnion(this.currentMessage.toJSON()) }
      )
        .then(() => {
          this.loading = false;
          this.scrollToBottom();
        })
        .catch((err) => console.error(err));
    }
  }

  scrollToBottom(): void {
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

  @Output() toggleThread = new EventEmitter<void>();

  toggle() {
    this.toggleThread.emit();
  }
}
