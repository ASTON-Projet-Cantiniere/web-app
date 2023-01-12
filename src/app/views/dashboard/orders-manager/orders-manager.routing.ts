import {Routes} from '@angular/router';
import {UpdateConstraintsComponent} from './update-constraints/update-constraints.component';
import {OrdersManagerComponent} from './orders-manager.component';

export const OrdersManagerRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: OrdersManagerComponent},
      {path: 'update-constraints', component: UpdateConstraintsComponent}
    ]
  }
];
