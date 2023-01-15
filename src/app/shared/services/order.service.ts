import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpError} from '../models/error.model';
import {OrderInterface, Quantity} from '../models/order.model';


@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {
  }
  /**
   * Affiche toutes les commandes
   * @returns Observable
   */
  getAllOrders(): Observable<OrderInterface[] | HttpError> {
    return this.http.get<OrderInterface[] | HttpError>('order/findall');
  }

  findOrder(orderId: number): Observable<OrderInterface> {
    return this.http.get<OrderInterface>('order/find/' + orderId)
  }

  /**
   * Affiche toutes les commandes présentes d'une date à une autre
   * @param beginDate Date
   * @param endDate Date
   * @param status number || 0 => CREATED
   * @returns Observable
   */
  getOrdersByRangeDate(status: number = 1, beginDate?: string, endDate?: string): Observable<OrderInterface[] | HttpError> {

    let my_url = `order/findallbetweendateinstatus?status=${status}`;
    if (beginDate) {
      my_url += `&beginDate=${beginDate}`;
    }
    if (endDate) {
      my_url += `&endDate=${endDate}`;
    }
    return this.http.get<OrderInterface[] | HttpError>(my_url);
  }

  /**
   * Permet de créer une commande contenant un ou plusieurs plats
   * @param userId Id de l'utilisateur: number
   * @param constraintId number || -1
   * @param quantity Objet(s) de commandes
   * @returns Observable, exploitable en cas d'erreur etc
   */
  createOrder(myuserId: number, myconstraintId: number = -1, ...myquantity: Quantity[]): Observable<OrderInterface | HttpError> {
    return this.http.put<OrderInterface | HttpError>(
      'order/add',
      {"userId" : myuserId,
        "constraintId": myconstraintId,
        "quantity":
            myquantity
      }
    )
  }

  /**
   * Effectue une commande si les ressources de l'utilisateur les lui permettent, prélève son argent et passe la commande au statut de 'DELIVERED(1)'
   * @param orderId number
   * @param constraintId number || -1
   * @returns Observable
   */
  deliverOrder(orderId: number, constraintId: number = -1): Observable<Quantity | HttpError> {
    return this.http.patch<Quantity | HttpError>(`order/deliverandpay/${orderId}/${constraintId}`, null)
  }

  /**
   * Affiche toutes les commandes faites par un utilisateur selon les critères
   * @param userId number
   * @param status  null || Number ('CREATED(0)' | 'DELIVERED(1)' | 'CANCELED(2)')
   * @param beginDate null || String
   * @param endDate null || String
   * @returns Observable
   */
  getOrdersUnconfirmedByUser(userId: number, status?: number, beginDate?: string, endDate?: string): Observable<OrderInterface[] | HttpError> {
    let my_url: string = `order/findallforuser/${userId}`;
    if (status || beginDate || endDate) {
      my_url += "?";

      if (status) {
        if (my_url.slice(-1) != "&") {
          my_url += `&status=${status}`;
        } else {
          my_url += `status=${status}`;
        }
      }

      if (beginDate) {
        if (my_url.slice(-1) != "&") {
          my_url += `&beginDate=${beginDate}`;
        } else {
          my_url += `beginDate=${beginDate}`;
        }
      }

      if (endDate) {
        if (my_url.slice(-1) != "&") {
          my_url += `&endDate=${endDate}`;
        } else {
          my_url += `endDate=${endDate}`;
        }
      }
    }
    return this.http.get<OrderInterface[] | HttpError>(my_url)
  }

  /**
   * Annule une commande, ce qui transforme son status en 'CANCELED(2)'
   * @param orderId number
   * @returns Observable
   */
  cancelOrder(orderId: number): Observable<any | HttpError> {
    return this.http.patch<any>(`order/cancel/${orderId}`, {orderId})
  }
}
