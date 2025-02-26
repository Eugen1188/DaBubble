import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'main', component: MaincomponentComponent },
];
