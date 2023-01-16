import {Routes} from '@angular/router';
import {AdminGuard} from '@core/guards/admin.guard';
import {DashboardComponent} from '@views/dashboard/dashboard.component';
import {IngredientsManagerComponent} from '@views/dashboard/ingredients-manager/ingredients-manager.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {path: 'ingredients', component: IngredientsManagerComponent},
      {path: 'menus', loadChildren: () => import('./menus-manager/menus-manager.module').then(m => m.MenusManagerModule)},
      {path: 'orders', loadChildren: () => import('./orders-manager/orders-manager.module').then(m => m.OrdersManagerModule)},
      {path: 'users', loadChildren: () => import('./users-manager/users-manager.module').then(m => m.UsersManagerModule)},
      {path: 'week-menus', loadChildren: () => import('./week-menus-manager/week-menus-manager.module').then(m => m.WeekMenusManagerModule)},
      {path: '**', component:DashboardComponent},
    ]
  }
];
