import { Component, OnInit } from '@angular/core';
import { OrderInterface } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/manager/order.service';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  orders: OrderInterface[] = [];
  public form!: FormGroup;
  constructor(private orderService: OrderService){

  }

  //TODO: seule la méthode getAllOrders() est appelée, faire les autres

  ngOnInit(): void {
    this.form = new FormGroup({
      status: new FormControl(),
      beginDate: new FormControl(),
      endDate: new FormControl()
    });
    this.orderService.getAllOrders().subscribe(r => {

      this.orders.push(...<[]>r);
    })
    console.log(this.orders);
  }

  public searchByDate(){
    this.orders = [];
    this.orderService.getOrdersByRangeDate(this.form.value.status, this.form.value.beginDate, this.form.value.endDate)
    .subscribe(r => {
      this.orders.push(...<[]>r);
    })
  }
}
