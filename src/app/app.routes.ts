import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AvatarselectionComponent } from './avatarselection/avatarselection.component';
import { ContactbarComponent } from './contactbar/contactbar.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { ThreadComponent } from './thread/thread.component';
import { DirectmessagesComponent } from './directmessages/directmessages.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DataprotectionComponent } from './dataprotection/dataprotection.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'main', component: MaincomponentComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'chat', component: MainChatComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'avatarselection', component: AvatarselectionComponent },
  // { path: 'contactbar', component: ContactbarComponent },
  // { path: 'add-channel', component: AddChannelComponent },
  { path: 'thread', component: ThreadComponent },
  { path: 'direct', component: DirectmessagesComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'Dataprotection', component: DataprotectionComponent },
];
