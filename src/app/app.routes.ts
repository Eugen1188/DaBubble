import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { MainChatComponent } from './main-chat/main-chat.component';
=======
import { SigninComponent } from './signin/signin.component';
>>>>>>> Stashed changes
=======
import { SigninComponent } from './signin/signin.component';
>>>>>>> Stashed changes

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'main', component: MaincomponentComponent },
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  { path: 'chat', component: MainChatComponent },
=======
  { path: 'signin', component:  SigninComponent },

>>>>>>> Stashed changes
=======
  { path: 'signin', component:  SigninComponent },

>>>>>>> Stashed changes
];
