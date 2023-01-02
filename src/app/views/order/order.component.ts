import { Component, Input, OnInit, Version } from '@angular/core';
import { OrderInterface } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/manager/order.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Menu } from 'src/app/shared/models/menu.model';
import { MenuService } from 'src/app/shared/services/manager/menu.service';
import { Meal } from 'src/app/shared/models/meal.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  public selected: string = 'meals';
  orders: OrderInterface[] = [];
  meals: Meal[] = [];
  menus: Menu[] = [];

  // public formAdd!: FormGroup;
  public formAdd = this.fb.group({
    userId: new FormControl(),
    constraintId: new FormControl(),
    quantity: this.fb.array([])
  })
  public formSearchByDate!: FormGroup;

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

  get qunatity() {
    return this.formAdd.controls["quantity"] as FormArray;
  }
  // addQuantity() {
  //   const quantityForm = this.fb.group({
  //     title: ['', Validators.required],
  //     level: ['beginner', Validators.required]
  //   });

  //   this.formAdd.controls["quantity"].push(quantityForm);
  // }

  
  public searchByDate(){
    this.orders = [];
    this.orderService.getOrdersByRangeDate(this.formSearchByDate.value.status, this.formSearchByDate.value.beginDate, this.formSearchByDate.value.endDate)
    .subscribe(r => {
      this.orders.push(...<[]>r);
    })
  }

  //TODO: Faire en sorte de pouvoir choisir plusieurs repas 'quantity'
  // public addOrder(){
  //   this.orderService.createOrder(this.formAdd.value.userId, this.formAdd.value.constraintId, this.formAdd.value.quantity)
  //   .subscribe
  // }

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
    alert('Are you sure you want to delete this order ?')
    // this.orderService.cancelOrder(id).subscribe;
  }

  public log(){
    console.log("j'ai cliqué");
    
  }
}
