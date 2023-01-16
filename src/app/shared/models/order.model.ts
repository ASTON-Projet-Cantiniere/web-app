import {Meal} from "./meal.model";
import {Menu} from "./menu.model";
import {User} from "./user.model";

export interface Order {
  id?: number,
  creationDate?: Date,
  creationTime?: Date,
  status: number,
  user: User, //à changer en User
  quantity?: Quantity[]
}

export interface Quantity {
  id?: number,
  meal?: Meal,
  menu?: Menu,
  quantity: number
}

export interface newOrder {
  userId: number,
  constraintId: number,
  quantity: Quantity[]
}
