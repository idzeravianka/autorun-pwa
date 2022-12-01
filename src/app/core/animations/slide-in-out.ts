import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('*', style({
      position: 'relative',
      backgroundColor: 'white',
    })),

    transition(':enter', [
      animate('.3s', keyframes([
        style({ left: '100%', backgroundColor: 'gainsboro' }),
        style({ left: '0', backgroundColor: 'white' }),
      ])),
    ]),

    transition(':leave', [
      animate('.3s', keyframes([
        style({ left: '0' }),
        style({ left: '100%', backgroundColor: 'gainsboro' }),
      ])),
    ]),
  ]);
