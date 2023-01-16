import {Component, OnInit} from '@angular/core';
import {newOrder, Order, Quantity} from "@shared/models/order.model";
import {Meal} from "@shared/models/meal.model";
import {Menu} from "@shared/models/menu.model";
import {OrderService} from "@shared/services/order.service";
import {MealService} from "@shared/services/meal.service";
import {MenuService} from "@shared/services/menu.service";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.scss']
})
export class OrdersManagerComponent implements OnInit {

  public selected: string = 'meals';

  orders: Order[] = [];
  meals: Meal[] = [];
  menus: Menu[] = [];

  public formSearchByDate!: FormGroup;
  public formAdd!: FormGroup;

  constructor(private orderService: OrderService, private mealService: MealService, private menuService: MenuService, private fb: FormBuilder){}

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
  /**
   * Ajoute un plat ou un menu à la commande en cours de création
   */
  addQuantity() {
    const quantityForm = this.fb.group({
      quantity: [null],
      mealId: [null],
      menuId: [null],
    });
    this.quantity.push(quantityForm);
    console.log(quantityForm);
  }
  /**
   * Reset les champs du formulaire d'ajout afin de changer de type: Plat/Menu
   */
  public myReset(){
    const control = <FormArray>this.formAdd.controls['quantity'];
    while (control.length > 0) {
      control.removeAt(0)
    }
    console.log(this.quantity);

  }
  /**
   * Créer une commande
   */
  public addOrder(){
    console.log(this.formAdd);
    this.orderService.createOrder({
      userId: this.formAdd.value.userId,
      constraintId: this.formAdd.value.constraintId,
      quantity: this.formAdd.value.quantity
    } as newOrder).subscribe();
  }

  /**
   * Recherche une commande selon une période donnée
   */
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
  /**
   * Annule une commande => Fait passer son status à CANCELED
   * @param id number
   */
  public cancelOrder(id: number){
    this.orderService.cancelOrder(id).subscribe();
    console.log(id);

  }

  deliverOrder(id: number) {
    this.orderService.deliverOrder(id).subscribe();
  }
}
