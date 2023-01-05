import {Routes} from '@angular/router';
import {AdminGuard} from '@core/guards/admin.guard';
import {DashboardComponent} from '@views/dashboard/dashboard.component';
import {IngredientsManagerComponent} from '@views/dashboard/ingredients-manager/ingredients-manager.component';
import {MenusManagerComponent} from "@views/dashboard/menus-manager/menus-manager.component";
import {UsersManagerComponent} from "@views/dashboard/users-manager/users-manager.component";
import {WeekMenusManagerComponent} from "@views/dashboard/week-menus-manager/week-menus-manager.component";

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {path: 'ingredients', component: IngredientsManagerComponent},
      {path: 'menus', component: MenusManagerComponent},
      {path: 'orders', loadChildren: () => import('./orders-manager/orders-manager.module').then(m => m.OrdersManagerModule)},
      {path: 'users', component: UsersManagerComponent},
      {path: 'week-menus', component: WeekMenusManagerComponent},
      {path: '**', component:DashboardComponent},
    ]
  }
];
