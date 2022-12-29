import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rootRouterConfig: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
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
