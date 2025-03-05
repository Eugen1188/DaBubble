import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { _MatInternalFormField } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-add-channel',
  imports: [FormsModule, NgClass, NgIf, MatRadioModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss',
})
export class AddChannelComponent {
  channelName: string = '';
  channelDescription: string = '';
  selectChannelMember: boolean = false;
  chooseMember:boolean = false;
//test
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  closeScree() {}

  onSubmit() {
    console.log('submit');
    this.selectChannelMember = true;
    console.log(this.selectChannelMember);
  }

  setChannelMember(value: boolean) {
    this.chooseMember = value;
    console.log(this.chooseMember);
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
    if (textarea.scrollHeight > 90) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  shrinkTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '60px';
  }
}
