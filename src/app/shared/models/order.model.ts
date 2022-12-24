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
    quantity: number,
    mealId: number,
    menuId: number
}