import {Menu} from "@shared/models/menu.model";
import {Meal} from "@shared/models/meal.model";

export enum WeekDay {
  Monday = "Lundi",
  Tuesday = "Mardi",
  Wednesday = "Mercredi",
  Thursday = "Jeudi",
  Friday = "Vendredi"
}

export interface CartItem{
  menu: Menu | null;
  meal: Meal | null;
  quantity: number;
  day: WeekDay;
}
