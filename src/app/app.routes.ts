import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { MainChatComponent } from './main-chat/main-chat.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'main', component: MaincomponentComponent },
  { path: 'chat', component: MainChatComponent },
];
