import {Routes} from '@angular/router';
import {AdminGuard} from '@core/guards/admin.guard';
import {DashboardComponent} from '@views/dashboard/dashboard.component';
import {IngredientsManagerComponent} from '@views/dashboard/ingredients-manager/ingredients-manager.component';
import {MenusManagerComponent} from "@views/dashboard/menus-manager/menus-manager.component";
import {UsersManagerComponent} from "@views/dashboard/users-manager/users-manager.component";
import {WeekMealsManagerComponent} from "@views/dashboard/week-meals-manager/week-meals-manager.component";

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
      {path: 'week-meals', component: WeekMealsManagerComponent},
      {path: '**', component:DashboardComponent},
    ]
  }
];
