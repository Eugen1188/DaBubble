import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../shared.service';
import { Message } from '../../models/message.class';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-chat',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent implements OnInit, AfterViewInit {
  chatmodule = inject(UserService);
  messages: Message[] = [];
  currentUser: string = 'Bob';

  dummyData = [
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:30',
      message: 'Hallo, wie geht’s dir?',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:31',
      message: 'Mir geht’s gut, danke! Und dir?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:32',
      message: 'Auch gut, danke der Nachfrage!',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:33',
      message: 'Was hast du heute so vor?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:35',
      message: 'Ich wollte ein bisschen lesen und später spazieren gehen.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:36',
      message: 'Klingt gut! Welches Buch liest du gerade?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:37',
      message: 'Einen Krimi von Agatha Christie. Richtig spannend!',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:38',
      message: 'Oh cool! Ich mag ihre Bücher auch.',
      newDay: false,
      avatar: 'avatar_1',
    },

    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:15',
      message: 'Guten Morgen! Wie hast du geschlafen?',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:17',
      message: 'Guten Morgen! Ganz gut, danke. Und du?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:20',
      message: 'Auch gut! Ich hab ein bisschen länger geschlafen.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:22',
      message: 'Manchmal braucht man das!',
      newDay: false,
      avatar: 'avatar_1',
    },

    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:00',
      message: 'Neuer Tag, neues Glück!',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:05',
      message: 'Genau! Was steht heute an?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:10',
      message: 'Ich muss ein paar Dinge erledigen, aber danach habe ich Zeit.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:12',
      message: 'Lass uns später treffen!',
      newDay: false,
      avatar: 'avatar_1',
    },
  ];

  constructor() {
    this.chatmodule.chatmoduleenabled = true;
    this.chatmodule.accountcreation = false
  }

  ngOnInit(): void {
    this.getMessages();
    // this.scrollToBottom();
  }

  getMessages() {
    this.dummyData.forEach((m: any) => {
      this.messages.push(new Message(m));
    });
  }
  ngAfterViewInit(): void {
    // const chatContent = document.querySelector('.chat-content');
    // if (chatContent) {
    //   const observer = new MutationObserver(() => this.scrollToBottom());
    //   observer.observe(chatContent, { childList: true, subtree: true });
    // }
  }

  scrollToBottom(): void {
    //   setTimeout(() => {
    //     const chatContent = document.querySelector(
    //       '.chat-content'
    //     ) as HTMLElement;
    //     if (chatContent) {
    //       chatContent.scrollTop = chatContent.scrollHeight;
    //     }
    //   }, 1000);
    // }
  }
}
