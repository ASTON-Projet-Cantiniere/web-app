import {Routes} from '@angular/router';
import {WeekMenusManagerComponent} from "@views/dashboard/week-menus-manager/week-menus-manager.component";

export const WeekMenusManagerRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: WeekMenusManagerComponent},
    ]
  }
];
