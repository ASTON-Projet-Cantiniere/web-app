import {Component, OnInit} from '@angular/core';
import {OrderInterface} from "@shared/models/order.model";
import {Meal} from "@shared/models/meal.model";
import {Menu} from "@shared/models/menu.model";
import {OrderService} from "@shared/services/manager/order.service";
import {MealService} from "@shared/services/manager/meal.service";
import {MenuService} from "@shared/services/manager/menu.service";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.scss']
})
export class OrdersManagerComponent implements OnInit {
  public selected: string = 'meals';
  
  orders: OrderInterface[] = [];
  meals: Meal[] = [];
  menus: Menu[] = [];

  // public formAdd!: FormGroup;

  public formSearchByDate!: FormGroup;
  public formAdd!: FormGroup;

  constructor(private orderService: OrderService, private mealService: MealService, private menuService: MenuService, private fb: FormBuilder){

  }

  //TODO: seule la méthode getAllOrders() est appelée, faire les autres
  public show(message: any): void{
    console.log(message);
    
  }
  
  ngOnInit(): void {
    this.formSearchByDate = new FormGroup({
      status: new FormControl(),
      beginDate: new FormControl(),
      endDate: new FormControl()
    });
    this.formAdd = this.fb.group({
      userId: [1],
      constraintId: [-1],
      quantity: this.fb.array([])
    })
    this.orderService.getAllOrders().subscribe(r => {

      this.orders.push(...<[]>r);
    })
    this.mealService.getAllMeal().subscribe(r => {

      this.meals.push(...<[]>r);
    })
    this.menuService.getAllMenusForThisWeek().subscribe(r => {

      this.menus.push(...<[]>r);
    })
    console.log(this.orders);
  }

  get quantity() {
    return this.formAdd.get("quantity") as FormArray;
  }

  addQuantity() {
    const quantityForm = this.fb.group({
      quantity: [null],
      mealId: [null],
      menuId: [null],
    });
    this.quantity.push(quantityForm);
    console.log(quantityForm);
  }

  public addOrder(){
    console.log(this.formAdd);
    this.orderService.createOrder(this.formAdd.value.userId, this.formAdd.value.constraintId, ...this.formAdd.value.quantity).subscribe();
    console.log({
      "userId": this.formAdd.value.userId,
      "constraintId": this.formAdd.value.constraintId,
      "quantity": [
        ...this.formAdd.value.quantity
      ]
    });
    
  }

  
  public searchByDate(){
    this.orders = [];
    this.orderService.getOrdersByRangeDate(this.formSearchByDate.value.status, this.formSearchByDate.value.beginDate, this.formSearchByDate.value.endDate)
    .subscribe(r => {
      this.orders.push(...<[]>r);
    })
  }

  /**
   * Récupère une commande selon son id
   * @param orderId number - Id de la commande
   */
  public findOrder(orderId:number){
    //Ne fonctionne pas, problème d'itération
    this.orders = [];
    console.log("j'ai cliqué");
    console.log(orderId);
    
    this.orderService.findOrder(orderId).subscribe(
      r => {
        this.orders.push(r);
        console.log(r);
      }
    )
  }

  public cancelOrder(id: number){
    this.orderService.cancelOrder(id).subscribe();
    console.log(id);
    
  }
}
