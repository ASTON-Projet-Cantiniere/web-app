import {Routes} from '@angular/router';
import {UsersManagerComponent} from './users-manager.component';
import {EditUserComponent} from './edit-user/edit-user.component';

export const UsersManagerRoutes: Routes = [
  {
    path : '',
    children: [
      { path: '', component: UsersManagerComponent },
      { path: ':id', component: EditUserComponent }
    ]
  },
];
