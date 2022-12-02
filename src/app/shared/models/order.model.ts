export interface OrderInterface {
    id?: number,
    creationDate?: Date,
    creationTime?: Date,
    status: number,
    user: any, //à changer en User
    quantity?: any[]
}