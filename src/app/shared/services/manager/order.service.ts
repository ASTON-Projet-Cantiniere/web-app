import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderInterface} from '../../models/order.model';


@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  /**
   * Affiche toutes les commandes
   * @returns Observable
   */
  getAllOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>('/order/findall')
  }

  /**
   * Affiche toutes les commandes présentes d'une date à une autre
   * @param beginDate Date
   * @param endDate Date
   * @param status number || 0 => CREATED
   * @returns Observable
   */
  getOrdersByRangeDate(status: number = 1, beginDate?: string, endDate?: string): Observable<OrderInterface[]> {

    let my_url = `/order/findallbetweendateinstatus?status=${status}`;

    if (status) {
      my_url += `&status=${status}`;
    }

    if (beginDate) {
      my_url += `&beginDate=${beginDate}`;
    }

    if (endDate) {
      my_url += `&endDate=${endDate}`;
    }
    return this.http.get<OrderInterface[]>(my_url)
  }

  /**
   * Permet de créer une commande contenant un ou plusieurs plats
   * @param userId Id de l'utilisateur: number
   * @param constraintId number || -1
   * @param quantity Objet(s) de commandes
   * @returns Observable, exploitable en cas d'erreur etc
   */
  createOrder(userId: number, constraintId: number = -1, ...quantity: any): Observable<OrderInterface> {
    return this.http.put<OrderInterface>(
      '/order/add',
      {
        //TODO: Faire une interface du param quantity
        "userId": userId,
        "constraintId": constraintId,
        "quantity": [
          quantity
        ]
      }
    )
  }

  /**
   * Effectue une commande si les ressources de l'utilisateur les lui permettent, prélève son argent et passe la commande au statut de 'DELIVERED(1)'
   * @param orderId number
   * @param constraintId number || -1
   * @returns Observable
   */
  deliverOrder(orderId: number, constraintId: number = -1): Observable<any> {
    return this.http.patch<any>(`/order/deliverandpay/${orderId}/${constraintId}`, null)
  }

  /**
   * Affiche toutes les commandes faites par un utilisateur selon les critères
   * @param userId number
   * @param status  null || string('CREATED(0)' | 'DELIVERED(1)' | 'CANCELED(2)')
   * @param beginDate null || Date
   * @param endDate null || Date
   * @returns Observable
   */
  getOrdersUnconfirmedByUser(userId: number, status?: string, beginDate?: string, endDate?: string): Observable<any> {
    let my_url: string = `/order/findallforuser/${userId}`;

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
    return this.http.get<OrderInterface[]>(my_url)
  }


  /**
   * Annule une commande, ce qui transforme son status en 'CANCELED(2)'
   * @param orderId number
   * @returns Observable
   */
  cancelOrder(orderId: number): Observable<any> {
    return this.http.get<any>(`/order/cancel/${orderId}`)
  }
}
