import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('bookAnimation', [
      state('blue', style({
        transform: 'translateX(-50%) rotate(-15deg)',
        opacity: 1
      })),
      state('green', style({
        transform: 'translateX(-50%) rotate(5deg)',
        opacity: 1
      })),
      state('pink', style({
        transform: 'translateX(-50%) rotate(25deg)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(-50%) rotate(0deg)', opacity: 0 }),
        animate('500ms ease-out')
      ])
    ])
  ]

})
export class LandingPageComponent {

}
