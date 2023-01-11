import {
  trigger,
  animate,
  style,
  transition,
  state,
} from '@angular/animations';

export const FadeInOut = trigger('fadeInOut', [
  state('in', style({opacity: 1, visibility: 'visible'})),
  state('out', style({opacity: 0, visibility: 'hidden'})),
  transition('in => out', animate('500ms ease-in-out')),
  transition('out => in', animate('500ms ease-in-out'))
]);

