import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  Input,
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

  dummyData = [
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:30',
      message: 'Hallo, wie geht’s dir?',
      newDay: true,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:31',
      message: 'Mir geht’s gut, danke! Und dir?',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:32',
      message: 'Auch gut, danke der Nachfrage!',
      newDay: false,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:33',
      message: 'Was hast du heute so vor?',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:35',
      message: 'Ich wollte ein bisschen lesen und später spazieren gehen.',
      newDay: false,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:36',
      message: 'Klingt gut! Welches Buch liest du gerade?',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:37',
      message: 'Einen Krimi von Agatha Christie. Richtig spannend!',
      newDay: false,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:38',
      message: 'Oh cool! Ich mag ihre Bücher auch.',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },

    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:15',
      message: 'Guten Morgen! Wie hast du geschlafen?',
      newDay: true,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:17',
      message: 'Guten Morgen! Ganz gut, danke. Und du?',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:20',
      message: 'Auch gut! Ich hab ein bisschen länger geschlafen.',
      newDay: false,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:22',
      message: 'Manchmal braucht man das!',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },

    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:00',
      message: 'Neuer Tag, neues Glück!',
      newDay: true,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:05',
      message: 'Genau! Was steht heute an?',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:10',
      message: 'Ich muss ein paar Dinge erledigen, aber danach habe ich Zeit.',
      newDay: false,
      avatar: '/img/avatars/avatar_3.png',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:12',
      message: 'Lass uns später treffen!',
      newDay: false,
      avatar: '/img/avatars/avatar_1.png',
    },
  ];

  testMode: boolean = false;

  unsubChannels!: () => void;
  unsubMessages!: () => void;

  ngOnInit(): void {
    this.getChannels();
  }

  getChannels() {
    this.channels = [];
    this.unsubChannels = onSnapshot(
      this.fireService.getCollectionRef('channels'),
      (list) => {
        this.channels = list.docs.map((element) => ({
          key: element.id,
          data: element.data(),
        }));
        this.currentChannel = this.channels[0];
        this.getMessages();
      }
    );
  }

  getMessages() {
    //this.messages = []; wegen dem nach untenscrollen auskommentiert

    if (!this.testMode) {
      this.unsubMessages = onSnapshot(
        this.fireService.getDocRef('channels', this.currentChannel.key),
        (element) => {
          if (element.exists())
            (this.messages = element
              .data()
              ['messages'].map((m: any) => new Message(m))),
              this.scrollToBottom();
        }
      );
    } else this.messages = this.dummyData.map((m: any) => new Message(m));
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
