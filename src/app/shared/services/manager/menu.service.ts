import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Img } from '../../models/img.model';
import { Menu } from '../../models/menu.model';

@Injectable({providedIn: 'root'})
export class MenuService {
  // TODO:
  //  getAllMenus()
  //  getMenuById()
  //  getMenuImageById()
  //  getAllMenusByWeekAndDay()
  //  getAllMenusByWeek()
  //  getAllMenusForThisDay()
  //  getAllMenusForThisWeek()
  //  addMenu()
  //  getImageMenuByID()

  constructor(private http: HttpClient) {
  }

  /**
   * Récupère tout les menus
   * @returns { Menu[] }
   */
  getAllMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.apiURL + '/menu/findall');
  }

  /**
   * Récupère un menu grâce à son id
   * @param { number } id l'id du menu
   * @return { Menu }
   */
  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(environment.apiURL + '/menu/find/' + id);
  }

  /**
   * Récupère l'image du menu grâce à son id
   * @param { number } id l'id du menu
   * @return { Img }
   */
  getMenuImageById(id: number): Observable<Img> {
    return this.http.get<Img>(environment.apiURL + '/menu/findimg/' + id);
  }

  /**
   * Récupère les menus disponibles pour la semaine et le jour sépcifié
   * @param { number } weekNumber le numéro de la semaine
   * @param { numer } dayNumber le numéro du jour de la semaine
   * @returns { Menu[] } 
   */
  getAllMenusByWeekAndDay(weekNumber: number, dayNumber: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.apiURL + '/menu/findallavailableforweekandday/' + weekNumber + '/' + dayNumber);
  }

  /**
   * Récupère tout les menus disponibles pour une semaine sépcifié
   * @param { number } weekNumber le numéro de la semaine
   * @return { Menu[] }
   */
  getAllMenusByWeek(weekNumber: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.apiURL + '/menu/findallavailableforweek/' + weekNumber);
  }

  /**
   * Récupère tout les menus disponible ce jour
   * @returns { Menu[] }
   */
  getAllMenusForThisDay(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.apiURL + '/menu/findallavailablefortoday');
  }

  /**
   * Récupère tout les menus disponible pour cette semaine
   * @returns { Menu[] }
   */
  getAllMenusForThisWeek(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.apiURL + '/menu/findallavailableforthisweek');
  }

  /**
   * Ajoute un menu
   * @return { Menu }
   */
  addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(environment.apiURL + '/menu/add', menu);
  }

  
}
