import { Meal } from "./meal.model";
import { Menu } from "./menu.model";
import { UserOut } from "./user.model";

export interface OrderInterface {
    id?: number,
    creationDate?: Date,
    creationTime?: Date,
    status: number,
    user: UserOut, //à changer en User
    quantity?: Quantity[]
}

export interface Quantity {
    id?: number,
    meal?: Meal,
    menu?: Menu,
    quantity: number
}