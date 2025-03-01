import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../shared.service';
import { Message } from '../../models/message.class';

@Component({
  selector: 'app-main-chat',
  imports: [MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent implements OnInit, AfterViewInit {
  chatmodule = inject(UserService);
  messages: any = [];

  dummyData: any[] = [
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:30',
      message: 'Hallo, wie geht’s dir?',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:31',
      message: 'Mir geht’s gut, danke! Und dir?',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:32',
      message: 'Auch gut, danke der Nachfrage!',
    },
  ];

  constructor() {
    this.chatmodule.chatmoduleenabled = true;
  }

  ngOnInit(): void {
    console.log('init');
    console.log(this.messages);
    this.getMessages();
    // this.scrollToBottom();
  }

  getMessages() {
    this.dummyData.forEach((m: any) => {
      this.messages.push(new Message(m));
    });
    console.log(this.messages);
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
