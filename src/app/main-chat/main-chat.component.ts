import { Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-chat',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    ChatContentComponent,
    MatSidenavModule,
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  chatmodule = inject(UserService);
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = true;

  constructor() {
    this.chatmodule.chatmoduleenabled = true;
    this.chatmodule.accountcreation = false;
  }

  toggleThread() {
    this.drawer.toggle(); // MatDrawer direkt toggeln
  }
}
