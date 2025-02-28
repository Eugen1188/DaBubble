import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SigninComponent } from '../signin/signin.component';
import { ShareddataService } from '../shareddata.service';

@Component({
  selector: 'app-maincomponent',
  imports: [HeaderComponent, FooterComponent, SigninComponent],
  templateUrl: './maincomponent.component.html',
  styleUrl: './maincomponent.component.scss',
})
export class MaincomponentComponent {
  chatmoduleenabled = inject(ShareddataService);
  constructor() {
    this.chatmoduleenabled.accountcreation = false;
  }
}
