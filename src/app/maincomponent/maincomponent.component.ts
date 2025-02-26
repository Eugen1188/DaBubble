import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-maincomponent',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './maincomponent.component.html',
  styleUrl: './maincomponent.component.scss',
})
export class MaincomponentComponent {}
