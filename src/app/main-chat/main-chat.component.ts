import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ShareddataService } from '../shareddata.service';

@Component({
  selector: 'app-main-chat',
  imports: [MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent implements OnInit, AfterViewInit {
  chatmodule = inject(ShareddataService);

  constructor() {
    this.chatmodule.chatmoduleenabled = true;
  }

  ngOnInit(): void {
    console.log('init');
    this.scrollToBottom();
  }

  ngAfterViewInit(): void {
    const chatContent = document.querySelector('.chat-content');
    if (chatContent) {
      const observer = new MutationObserver(() => this.scrollToBottom());
      observer.observe(chatContent, { childList: true, subtree: true });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatContent = document.querySelector(
        '.chat-content'
      ) as HTMLElement;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 1000);
  }
}
