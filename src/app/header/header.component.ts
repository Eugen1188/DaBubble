import {
  Component,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared.service';
import { getAuth, signOut, User } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    UserProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTriggerRef!: MatMenuTrigger;
  showmodifycontent = false;
  displayName: string | null = null;
  user: User | null = null;
  auth = inject(Auth);
  opened = 0;
  show() {
    this.opened++;
    this.showmodifycontent = true;
  }

  showmenu() {
    this.showmodifycontent = false;
  }

  chatmoduleenabled = inject(UserService);
  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.displayName = this.user.displayName;
    }
  }

  async signOut() {
    await signOut(this.auth);
    this.chatmoduleenabled.redirectiontologinpage();
  }
}
