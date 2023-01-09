import {Routes} from '@angular/router';
import {UsersManagerComponent} from './users-manager.component';
import {EditUserComponent} from './edit-user/edit-user.component';

export const UsersManagerRoutes: Routes = [
  {
    path: '',
    component: UsersManagerComponent,
    children: [{ path: 'edit-user', component: EditUserComponent }]
  },
];
