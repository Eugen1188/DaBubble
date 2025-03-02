import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-add-channel',
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  channelName: string = "";
  channelDescription: string = "";
  selectChannelMember: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  closeScree() {

  }

  onSubmit() {
    console.log("submit");
    this.selectChannelMember = true;
    console.log(this.selectChannelMember);

  }

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    if (textarea.scrollHeight > 90) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = '90px';
    }
  }

  expandTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '90px';
    if(textarea.scrollHeight > 90) {
      textarea.style.height =`${textarea.scrollHeight}px`;
    }
  }

  shrinkTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '60px';
  }
}
