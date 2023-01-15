import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Image} from '@shared/models/image.model';
import {AddMenu, Menu} from '@shared/models/menu.model';

@Injectable({providedIn: 'root'})
export class MenuService {

  constructor(private http: HttpClient) {
  }

  /**
   * Récupère tout les menus
   * @returns { Menu[] }
   */
  getAllMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/menu/findall');
  }

  /**
   * Récupère un menu grâce à son id
   * @param { number } id l'id du menu
   * @return { Menu }
   */
  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>('/menu/find/' + id);
  }

  /**
   * Récupère l'image du menu grâce à son id
   * @param { number } id l'id du menu
   * @return { Image }
   */
  getMenuImageById(id: number): Observable<Image> {
    return this.http.get<Image>('/menu/findimg/' + id);
  }

  /**
   * Récupère les menus disponibles pour la semaine et le jour sépcifié
   * @param { number } weekNumber le numéro de la semaine
   * @param { number } dayNumber le numéro du jour de la semaine
   * @returns { Menu[] }
   */
  getAllMenusByWeekAndDay(weekNumber: number, dayNumber: number): Observable<Menu[]> {
    return this.http.get<Menu[]>('/menu/findallavailableforweekandday/' + weekNumber + '/' + dayNumber);
  }

  /**
   * Récupère tout les menus disponibles pour une semaine sépcifié
   * @param { number } weekNumber le numéro de la semaine
   * @return { Menu[] }
   */
  getAllMenusByWeek(weekNumber: number): Observable<Menu[]> {
    return this.http.get<Menu[]>('/menu/findallavailableforweek/' + weekNumber);
  }

  /**
   * Récupère tout les menus disponible ce jour
   * @returns { Menu[] }
   */
  getAllMenusForThisDay(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/menu/findallavailablefortoday');
  }

  /**
   * Récupère tout les menus disponible pour cette semaine
   * @returns { Menu[] }
   */
  getAllMenusForThisWeek(category?: number): Observable<Menu[]> {
    return this.http.get<Menu[]>('/menu/findallavailableforthisweek?category=3');
  }

  /**
   * Ajoute un menu
   * @return { Menu }
   */
  addMenu(menu: AddMenu): Observable<Menu> {
    console.log(menu);
    
    return this.http.put<Menu>('/menu/add', menu);
  }

  /**
   * Supprime un menu de la base de données selon son id
   * @param menuId 
   * @returns 
   */
  deleteMenu(menuId: number){
    return this.http.delete<Menu>(`/menu/delete/${menuId}`);
  }
}
