import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../shared.service';

@Component({
  selector: 'app-main-chat',
  imports: [MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  chatmodule = inject(UserService);
  constructor() {
    this.chatmodule.chatmoduleenabled = true;
  }
}
