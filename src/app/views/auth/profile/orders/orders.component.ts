import {Component, OnInit} from '@angular/core';
import {Order} from "@shared/models/order.model";
import {Meal} from "@shared/models/meal.model";
import {Menu} from "@shared/models/menu.model";
import {OrderService} from "@shared/services/order.service";
import {MealService} from "@shared/services/meal.service";
import {MenuService} from "@shared/services/menu.service";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from "@angular/forms";
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public selected: string = 'meals';

  orders: Order[] = [];


  public formSearchByDate!: FormGroup;


  constructor(private orderService: OrderService, private mealService: MealService, private menuService: MenuService, private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {

    this.formSearchByDate = new FormGroup({
      status: new FormControl(),
      beginDate: new FormControl(),
      endDate: new FormControl()
    });
    this.getUserOrders();
    console.log(this.orders);
  }

  public getUserOrders(status = 1, beginDate?: string, endDate?: string){

    this.orderService.getOrdersUnconfirmedByUser(this.authService.getUser()!.id, status, beginDate, endDate).subscribe(r => {

      this.orders.push(...<[]>r);
    });
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
}
