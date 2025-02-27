import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShareddataService } from '../shareddata.service';
import { CommonModule } from '@angular/common';

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
export class HeaderComponent {
  chatmoduleenabled = inject(ShareddataService);
}
