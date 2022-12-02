import { Component, OnInit } from '@angular/core';
import { OrderInterface } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/manager/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  orders: OrderInterface[] = [];

  constructor(private orderService: OrderService){

  }

  //TODO: seule la méthode getAllOrders() est appelée, faire les autres

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(r => {

      this.orders.push(...r);
    })
    console.log(this.orders);
    
    
  }
}
