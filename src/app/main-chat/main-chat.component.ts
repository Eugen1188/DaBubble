import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-chat',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {}
