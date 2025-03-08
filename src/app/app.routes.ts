import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SigninComponent } from './signin/signin.component';
import { ThreadComponent } from './thread/thread.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'main', component: MaincomponentComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'chat', component: MainChatComponent },
  { path: 'thread', component: ThreadComponent },
];
