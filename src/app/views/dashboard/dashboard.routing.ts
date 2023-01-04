import {Routes} from '@angular/router';
import {DashboardComponent} from '@views/dashboard/dashboard.component';
import {AdminGuard} from '@core/guards/admin.guard';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [AdminGuard],
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      }
    ]
  }
];
