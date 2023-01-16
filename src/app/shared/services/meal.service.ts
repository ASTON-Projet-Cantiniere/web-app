import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Image} from '@shared/models/image.model';
import {Meal} from '@shared/models/meal.model';

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
    return this.http.put<Meal>(`/meal/add`, meal);
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

  /**
   * récupère tous les plats disponible par le jour de la semaine dans l'année
   * @param {numer} week number of the week
   * @param {number} day number of the day in the week
   * @returns
   */
  getMealAvailableForWeekAndDay(week: number, day: number, category?: number): Observable<Meal[]> {
    if(category) {
      return this.http.get<Meal[]>('/meal/findallavailableforweekandday/'+week+'/'+day+'?category='+category);
    }
    return this.http.get<Meal[]>('/meal/findallavailableforweekandday/'+week+'/'+day);
  }

  /**
   * récupère les plats disponibles pout la semaine
   * @param {number} week number of the week
   * @returns
   */
  getAllMealAvailableForWeek(week: number, category?: number): Observable<Meal[]> {
    if(category) {
      return this.http.get<Meal[]>('/meal/findallavailableforweek/'+week+'?category=' + category);
    }
    return this.http.get<Meal[]>('/meal/findallavailableforweek/'+week);
  }

  /**
   * met à jour un plat
   * @param {number} id l'id du plat à mettre à jour
   * @param {Meal} meal le plat modifié
   * @returns
   */
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.patch<Meal>('/meal/update/'+id, meal);
  }
}
