import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@shared/models/user.model'
import {HttpError} from '@shared/models/error.model'
import {Image} from '@shared/models/image.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Permet de chercher tous les utilisateurs
   * @returns tous les utilisateurs ou error
   */
  public getUsers(): Observable<User | HttpError> {
    return this.http.get<User | HttpError>('/user/findall')
  }

  /**
   * Permet de chercher un utilisateur via son id
   * @param id number, id de l'utilisateurs
   * @returns l'utilisateurs associé à l'id  ou error
   */
  public getUserByID(id: number): Observable<any> {
    return this.http.get<User | HttpError>('/user/find/' + id);
  }

  /**
   * Permet de chercher l'image d'un utilisateurs via son id
   * @param id number, id de l'utilisateurs
   * @returns l'image de l'utilisateurs associé à l'id ou error
   */
  public getImgUserByID(id: number): Observable<Image | HttpError> {
    return this.http.get<Image | HttpError>('/user/findimg/' + id);
  }

  /**
   * Permet de supprimer l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public deleteUserByID(id: number): Observable<User | HttpError> {
    return this.http.delete<User | HttpError>('/user/delete/' + id);
  }

  /**
   * Permet d'activer l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchActivateUser(id: number): Observable<User | HttpError> {
    return this.http.patch<User | HttpError>('/user/activate/' + id, null);
  }

  /**
   * Permet désactiver l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchDesactivateUser(id: number): Observable<User | HttpError> {
    return this.http.patch<User | HttpError>('/user/desactivate/' + id, null);
  }

  /**
   * Permet de mettre à jour l'utilisateur
   * @param id number, id de l'utilisateurs
   * @param user User, les données de l'utilisateur
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchUpdateUser(id: number, user:User): Observable<User | HttpError> {
    return this.http.patch<User | HttpError>('/user/update/' + id, user);
  }

  /**
   * Permet de mettre à jour l'img l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Limg de l 'utilisateur associé à l'id ou error
   */
  public patchUpdateImgUser(id: number): Observable<Image | HttpError> {
    return this.http.patch<Image | HttpError>('/user/upadateimg/' + id, null);
  }

  /**
   * Permet de créditer le wallet de l'utilisateur via son id
   * @param id number, id de l'utilisateur
   * @param amount number, la somme que l'on souhaite créditer
   * @returns Les informations de l'utilisateurs
   */
  public postUserCredit(id: number, amount: number): Observable<User | HttpError> {
    return this.http.post<User>(`/user/credit/${id}?amount=${amount}`,null);
  }

  /**
   * Permet de débiter le wallet de l'utilisateur via son id
   * @param id number, id de l'utilisateur
   * @param amount number, la somme que l'on souhaite debiter
   * @returns Les informations de l'utilisateurs
   */
  public postUserDebit(id: number, amount: number): Observable<User | HttpError> {
    return this.http.post<User | HttpError>(`/user/debit/${id}?amount=${amount}`,null);
  }

  /**
   * Permet de vérifier le mot de passe de l'utilisateur
   * @param id number, id de l'utilisateur
   * @param password string, le mot de passe de l'utilisateur
   * @returns Les informations de l'utilisateurs
    */
  public checkPassword(id: number, password: string): Observable<any> {
    return this.http.get<any>('/user/checkpassword/' + id + '?password=' + password);
  }
}

  

