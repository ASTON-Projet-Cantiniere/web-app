import {Component, OnInit} from '@angular/core';
import {OrderInterface} from "@shared/models/order.model";
import {OrderService} from "@shared/services/manager/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: OrderInterface[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(r => {
      this.orders.push(...r);
    })
    console.log(this.orders);
  }
}
