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
import { Router } from '@angular/router';

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
  router: Router = inject(Router);

  loading: boolean = false;
  channels: any = [];
  currentChannel: any = {};

  unsubMessages!: () => void;

  messages: Message[] = [];
  input: string = '';

  async ngOnInit() {
    if (!this.userService.auth.currentUser) this.router.navigate(['/main']);
    else {
      this.scrollToBottom();
      this.channels = await this.fireService.getChannels();
      this.currentChannel = this.channels[0];
      this.getMessages();
    }
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

  isFirstMessageOfDay(index: number): boolean {
    if (index === 0) return true;

    return (
      !this.isToday(this.messages[index - 1].date) ||
      this.messages[index].date !== this.messages[index - 1].date
    );
  }

  async newMessage() {
    this.loading = true;
    await updateDoc(
      this.fireService.getDocRef('channels', this.currentChannel.id),
      { messages: arrayUnion(new Message(this.buildMessageObject()).toJSON()) }
    )
      .then(() => {
        this.loading = false;
        this.scrollToBottom();
        this.input = '';
      })
      .catch((err) => console.error(err));
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
