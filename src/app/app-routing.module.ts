import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { OrderComponent } from './views/order/order.component';

const rootRouterConfig: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ],
    
  },
  {
    path: 'orders',
    component: OrderComponent
  }
  // {
  //   path: '',
  //   children: [{path: 'admin'}]
  // },
  //
  // {
  //   path: '',
  //   children: [{path: 'error',}]
  // },
  // {
  //   path: '**',
  //   redirectTo: 'error/404'
  // }
];

const routerOptions: any = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
