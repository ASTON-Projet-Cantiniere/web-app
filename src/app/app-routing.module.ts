import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const rootRouterConfig: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)}
    ],
  },
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)}
    ]
  },
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/week-meals/week-meals.module').then(m => m.WeekMealsModule)}
    ]
  },
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/menus/menus.module').then(m => m.MenusModule)}
    ]
  },
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/cart/cart.module').then(m => m.CartModule)}
    ]
  },
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)}
    ]
  },
  {
    path: '',
    children: [
      {path: 'error', loadChildren: () => import('./views/error-page/error-page.module').then(m => m.ErrorPageModule)}
    ]
  },
  {path: '**', redirectTo: 'error/404'}
];

const routerOptions: any = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
