import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'main', component: MaincomponentComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'chat', component: MainChatComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'singup', component: SignupComponent },
];
