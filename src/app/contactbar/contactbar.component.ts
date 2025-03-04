import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactbar',
  imports: [CommonModule],
  templateUrl: './contactbar.component.html',
  styleUrl: './contactbar.component.scss'
})
export class ContactbarComponent {
  active: boolean = false;
  message: boolean = false;
  channels = [
    {
      name: 'Entwicklerteam'
    },
    {
      name: 'Backoffice'
    },
    {
      name: 'Support'
    },

  ]

  contacts=[
    {
      name:'Frederik Beck (Du)',
      default:'/img/man2active.svg'
    },
    {
      name:'Sofia Müller',
      default:'/img/woman1.svg'
    },
    {
      name:'Noah Braun',
      default:'/img/man1active.svg'
    },
    {
      name:'Elise Roth',
      default:'/img/woman2.svg'
    },
    {
      name:'Elias Neumann',
      default:'/img/man3active.svg'
    },
    {
      name:'Steffen Hoffmann',
      default:'/img/man4active.svg'
    },
  ]

  toggleActive() {
    this.active = !this.active;
    console.log(this.active);
  }

  toggleMessage() {
    this.message = !this.message;
    console.log('message = ' + this.message);

  }

  isOpen() {
    return this.message === true;
  }

  isActive() {
    return this.active === true;
  }
}
