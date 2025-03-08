import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [
    trigger('moveUp', [
      state('beginup', style({ transform: 'translate(0, 0)' })),
      state(
        'endbegin',
        style({
          transform: 'translate(-947px, -565px)',
          width: '70px',
          height: '75px',
        })
      ),
      transition('beginup => endbegin', animate('2000ms  ease-out')),
    ]),
    trigger('moveRight', [
      state('startright', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(200px)' })),
      state('back', style({ transform: 'translateX(93px)' })),
      transition('startright => end', animate('1000ms ease-out')),
      transition('end => back', animate('1000ms 700ms ease-out')),
    ]),
  ],
})
export class IntroComponent implements OnInit {
  animationStateUp = 'beginup';
  animationStateRight = 'startright';

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animationStateRight = 'end';
      setTimeout(() => {
        setTimeout(() => {
          this.animationStateRight = 'back';
        }, 200);
        this.animationStateUp = 'endbegin';
      }, 3800);
      setTimeout(() => {
        this.router.navigate(['/main']);
      }, 6500);
    }, 2500);
  }
}
