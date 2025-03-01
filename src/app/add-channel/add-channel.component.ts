import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-channel',
  imports: [FormsModule],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

  channelName: string = "";
  channelDescription: string = "";

  closeScree() {

  }

  onSubmit() {
    console.log("submit");
  }

}
