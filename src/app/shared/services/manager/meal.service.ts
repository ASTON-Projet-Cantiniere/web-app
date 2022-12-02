import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Img } from '../../models/img.model';
import { Meal } from '../../models/meal.model';

@Injectable({providedIn: 'root'})
export class MealService {
  // TODO
  // getAllMeals()
  // getMealByID()
  // addMeal()
  // deleteMealByID()
  // getImageMenuByID()

  constructor(private http: HttpClient) {
  }

  /**
   * Récupérer tout les plats
   * @return { Meal[] }
   */
  getAllMeal(): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.apiURL + '/meal/findall');
  }

  /**
   * Récuperer un plat grâce à son ID
   * @param { number } id l'id du plat
   * @return { Meal }
   */
  getMealByID(id: number): Observable<Meal> {
    return this.http.get<Meal>(environment.apiURL + `/meal/find/${id}`);
  }

  /**
   * Ajoute un plat
   * @param { Meal } meal le plat à ajouter
   * @return { Meal } le plat ajouté
   */
  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(environment.apiURL + `/meal/add`, meal);
  }

  /**
   * Supprime un plat
   * @param { numer } id l'id du plat
   * @return { Meal }
   */
  deleteMealByID(id: number): Observable<Meal> {
    return this.http.delete<Meal>(environment.apiURL + `/meal/delete/${id}`);
  }

  /**
   * Récupère l'image du plat correspondant grâce à l'id du plat
   * @param { Meal } id l'id du plat
   * @return { Img }
   */
  getMealImageByID(id: number): Observable<Img> {
    return this.http.get<Img>(environment.apiURL + `/meal/findimg/${id}`);
  }
}
