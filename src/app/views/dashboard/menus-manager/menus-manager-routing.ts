import {Routes} from '@angular/router';
import {MenusManagerComponent} from './menus-manager.component';

export const MenusManagerRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: MenusManagerComponent},
      // {path: 'update-constraints', component: UpdateConstraintsComponent}
    ]
  }
];
