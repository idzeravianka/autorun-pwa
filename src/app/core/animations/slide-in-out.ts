import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const slideInOutAnimation = (animationDirection: string) => {
  return trigger('slideInOutAnimation', [
    state('*', style({
      position: 'relative',
      backgroundColor: 'white',
    })),

    transition(':enter', [
      animate('.3s', keyframes([
        style({ [animationDirection]: '100%', backgroundColor: 'gainsboro' }),
        style({ [animationDirection]: '0', backgroundColor: 'white' }),
      ])),
    ]),

    transition(':leave', [
      animate('.3s', keyframes([
        style({ [animationDirection]: '0' }),
        style({ [animationDirection]: '100%', backgroundColor: 'gainsboro' }),
      ])),
    ]),
  ]);
};
