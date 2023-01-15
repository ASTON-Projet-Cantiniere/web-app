import {Menu} from "@shared/models/menu.model";

export enum WeekDay {
  Monday = "Lundi",
  Tuesday = "Mardi",
  Wednesday = "Mercredi",
  Thursday = "Jeudi",
  Friday = "Vendredi"
}

export interface CartItem{
  menu: Menu;
  quantity: number;
  day: WeekDay;
}
