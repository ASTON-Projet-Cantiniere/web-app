import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorModel } from '../../models/error.model';
import { OrderInterface, Quantity } from '../../models/order.model';


@Injectable({providedIn: 'root'})
export class OrderService {

  private authorization: string = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJ3YWxsZXQiOjkuOTMsInJlZ2lzdHJhdGlvbkRhdGUiOlsyMDIyLDIsMTUsMTAsMzQsNTFdLCJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaXNMdW5jaExhZHkiOnRydWUsIm5hbWUiOiJCcnVuZWwiLCJmaXJzdG5hbWUiOiJMb3VpcyIsInBob25lIjoiMjI3ODcyMDIxMCIsInNleCI6Miwic3RhdHVzIjowLCJpbWFnZUlkIjoxfSwicm9sZXMiOlsiUk9MRV9MVU5DSExBRFkiXSwiaXNzIjoic2VjdXJlLWFwaSIsImF1ZCI6InNlY3VyZS1hcHAiLCJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImV4cCI6MTY3MTk2NTM0NH0.bWvSBQiyFsFEZQdfdKe_62OLj5BXdK2P3jo83uzZKUxiebkioP3of6cig4ivpfxrDFLEwSKAw943VVW-HNSpHA"
  private URL_ORDER: string = environment.apiURL + '/order'; 
  
  constructor(private http: HttpClient) {
  }

  /**
   * Affiche toutes les commandes
   * @returns Observable
   */
  getAllOrders(): Observable<OrderInterface[] | ErrorModel>{
    return this.http.get<OrderInterface[] | ErrorModel >(this.URL_ORDER + '/findall', {
      headers: {
        "Authorization": this.authorization}
    })
  }

  findOrder(orderId: number): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(this.URL_ORDER + '/find/' + orderId, {
      headers: {
        'Authorization': this.authorization
      }
    })
  }

  /**
   * Affiche toutes les commandes présentes d'une date à une autre
   * @param beginDate Date
   * @param endDate Date
   * @param status number || 0 => CREATED
   * @returns Observable
   */
  getOrdersByRangeDate(status: number = 1 ,beginDate?: string, endDate?: string): Observable<OrderInterface[] | ErrorModel>{

    let my_url = this.URL_ORDER + `/findallbetweendateinstatus?status=${status}`;

      if (beginDate) {
        
          my_url += `&beginDate=${beginDate}`;
        
      }

      if (endDate) {
        
          my_url += `&endDate=${endDate}`;
        
      
    }
    return this.http.get<OrderInterface[] | ErrorModel >(my_url, {
      headers: {
        "Authorization": this.authorization}
    })
  }

  /**
   * Permet de créer une commande contenant un ou plusieurs plats
   * @param userId Id de l'utilisateur: number
   * @param constraintId number || -1
   * @param quantity Objet(s) de commandes
   * @returns Observable, exploitable en cas d'erreur etc
   */
  createOrder(userId: number, constraintId: number = -1, ...quantity: Quantity[]): Observable<OrderInterface | ErrorModel > {
    return this.http.put<OrderInterface | ErrorModel >(
      this.URL_ORDER + '/add',
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
  deliverOrder(orderId: number, constraintId: number = -1): Observable<any | ErrorModel>{
    return this.http.patch<any | ErrorModel >(this.URL_ORDER + `/deliverandpay/${orderId}/${constraintId}`, null)
  }

  /**
   * Affiche toutes les commandes faites par un utilisateur selon les critères
   * @param userId number
   * @param status  null || string('CREATED(0)' | 'DELIVERED(1)' | 'CANCELED(2)')
   * @param beginDate null || Date 
   * @param endDate null || Date 
   * @returns Observable
   */
  getOrdersUnconfirmedByUser(userId: number, status?: string, beginDate?: string, endDate?: string): Observable<OrderInterface[] | ErrorModel>{
    let my_url: string = this.URL_ORDER + `/findallforuser/${userId}`;

    if (status || beginDate || endDate) {
      my_url += "?";

      if (status) {
        if (my_url.slice(-1) != "&") {
          my_url += `&status=${status}`;
        }else {
          my_url += `status=${status}`;
        }
      }

      if (beginDate) {
        if (my_url.slice(-1) != "&") {
          my_url += `&beginDate=${beginDate}`;
        }else {
          my_url += `beginDate=${beginDate}`;
        }
      }

      if (endDate) {
        if (my_url.slice(-1) != "&") {
          my_url += `&endDate=${endDate}`;
        }else {
          my_url += `endDate=${endDate}`;
        }
      }
    }
    return this.http.get<OrderInterface[] | ErrorModel>(my_url)
  }

  
  /**
   * Annule une commande, ce qui transforme son status en 'CANCELED(2)'
   * @param orderId number
   * @returns Observable
   */
  cancelOrder(orderId: number): Observable<any | ErrorModel >{
    return this.http.get<any>(this.URL_ORDER + `/cancel/${orderId}`)
  }
}