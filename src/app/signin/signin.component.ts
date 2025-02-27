import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { ShareddataService } from '../shareddata.service';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, MatDividerModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {}
