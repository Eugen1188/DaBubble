import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { ShareddataService } from '../shareddata.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  user = new User();
  submitted = false;
  accountcreationenabled = inject(ShareddataService);
  constructor() {
    this.accountcreationenabled.chatmoduleenabled = false;
    this.accountcreationenabled.accountcreation = true;
  }
  onSubmit(emailform: NgForm) {
    this.submitted = true;
    emailform.reset();
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
  }
}
