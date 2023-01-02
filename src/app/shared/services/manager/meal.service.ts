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
  private authorization: string = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJ3YWxsZXQiOjkuOTMsInJlZ2lzdHJhdGlvbkRhdGUiOlsyMDIyLDIsMTUsMTAsMzQsNTFdLCJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaXNMdW5jaExhZHkiOnRydWUsIm5hbWUiOiJCcnVuZWwiLCJmaXJzdG5hbWUiOiJMb3VpcyIsInBob25lIjoiMjI3ODcyMDIxMCIsInNleCI6Miwic3RhdHVzIjowLCJpbWFnZUlkIjoxfSwicm9sZXMiOlsiUk9MRV9MVU5DSExBRFkiXSwiaXNzIjoic2VjdXJlLWFwaSIsImF1ZCI6InNlY3VyZS1hcHAiLCJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImV4cCI6MTY3MjQzNDQyNX0.vNyrHzfnYYaNVaZZLJ-NH17m-zOisJ76DCXcXTvK4EbtV3tTUCVAspSuDgOyn8WdpbVrzYw0aV-ky7q5zueR6Q"
  constructor(private http: HttpClient) {
  }


  /**
   * Récupérer tout les plats
   * @return { Meal[] }
   */
  getAllMeal(): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.apiURL + '/meal/findall', {
      headers: {
        "Authorization": this.authorization}
    })
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
