import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Image} from '../models/image.model';
import {Meal} from '../models/meal.model';

@Injectable({providedIn: 'root'})
export class MealService {

  constructor(private http: HttpClient) {
  }

  /**
   * Récupérer tout les plats
   * @return { Meal[] }
   */
  getAllMeal(): Observable<Meal[]> {
    return this.http.get<Meal[]>('/meal/findall');
  }

  /**
   * Récuperer un plat grâce à son ID
   * @param { number } id l'id du plat
   * @return { Meal }
   */
  getMealByID(id: number): Observable<Meal> {
    return this.http.get<Meal>(`/meal/find/${id}`);
  }

  getAllMealForThisWeek(category?: number): Observable<Meal[]> {
    if(category) {
      return this.http.get<Meal[]>('/meal/findallavailableforthisweek?category=' + category);
    }
    return this.http.get<Meal[]>('/meal/findallavailableforthisweek');
  }

  /**
   * Ajoute un plat
   * @param { Meal } meal le plat à ajouter
   * @return { Meal } le plat ajouté
   */
  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`/meal/add`, meal);
  }

  /**
   * Supprime un plat
   * @param { number } id l'id du plat
   * @return { Meal }
   */
  deleteMealByID(id: number): Observable<Meal> {
    return this.http.delete<Meal>(`/meal/delete/${id}`);
  }

  /**
   * Récupère l'image du plat correspondant grâce à l'id du plat
   * @param { Meal } id l'id du plat
   * @return { Image }
   */
  getMealImageByID(id: number): Observable<Image> {
    return this.http.get<Image>(`/meal/findimg/${id}`);
  }

  /**
   * Récupère tout les plats disponible pour le jour même
   * @return{ Observable<Meal[]> }
   */
  getAllMealAvailableForToday(): Observable<Meal[]> {
    return this.http.get<Meal[]>('/meal/findallavailablefortoday');
  }
}
