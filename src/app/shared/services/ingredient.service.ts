import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '@shared/models/meal.model';
import { Image } from '@shared/models/image.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  /**
   * récupère tous les ingrédients
   * @returns {Ingredient}
   */
  getAllIngredient(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('/ingredient/findall');
  }

  /**
   * récupère l'ingrédient grâce à son id
   * @param {number} id 
   * @returns 
   */
  getIngredientById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>('/ingredient/find/'+id);
  }

  /**
   * récupère l'image de l'ingrédient 
   * @param {number} id de l'ingrédient
   * @returns 
   */
  getIngredientImgById(id: number): Observable<Image> {
    return this.http.get<Image>('/ingredient/findimg/'+id);
  }

  /**
   * met à jour un ingrédient
   * @param {number} id l'id de l'ingrédient à mettre à jour
   * @param {Ingredient} ingredient la nouvelle version de l'ingrédient
   * @returns l'ingrédient mis à jour
   */
  updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>('/ingredient/update/'+id, ingredient);
  }

  /**
   * met à jour l'image d'un ingrédient
   * @param {number } id l'id de l'ingrédient
   * @param {Image} image la nouvelle image
   * @returns l'ingrédient
   */
  updateIngredientImg(id: number, image: Image): Observable<Ingredient> {
    return this.http.patch<Ingredient>('/ingredient/updateimg/'+id, image);
  }

  /**
   * ajoute un ingrédient
   * @param {Ingredient} ingredient l'ingrédient à ajouter
   * @returns l'ingrédient ajouté
   */
  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>('ingredient/add', ingredient);
  }

  /**
   * supprime un ingrédient
   * @param {number} id l'id de l'ingrédient à supprimer
   * @returns l'ingrédient supprimé
   */
  deleteIngredient(id: number): Observable<Ingredient> {
    return this.http.delete<Ingredient>('/ingredient/delete/'+id);
  }


}
