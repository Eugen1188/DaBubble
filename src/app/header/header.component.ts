import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared.service';
import { getAuth, signOut, User } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayName: string | null = null;
  user: User | null = null;
  auth = inject(Auth);

  chatmoduleenabled = inject(UserService);
  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.displayName = this.user.displayName;
    }
  }
  async signOut() {
    await signOut(this.auth);
  }
}
