import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {UserOut} from 'src/app/shared/models/user.model'
import {ErrorModel} from 'src/app/shared/models/error.model'
import { ImageModel } from '../models/image.model';
import { UserIn } from '../models/user-in.model';
import { ImgUser } from '../models/imguser.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Permet de chercher tous les utilisateurs
   * @returns tous les utilisateurs ou error
   */
  public getUsers(): Observable< UserOut | ErrorModel> {
    return this.http.get<UserOut |ErrorModel>(environment.apiURL + 'user/findall');
  }
  /**
   * Permet de chercher un utilisateur via son id
   * @param id number, id de l'utilisateurs
   * @returns l'utilisateurs associé à l'id  ou error
   */
  public getUserByID(id:number): Observable<UserOut | ErrorModel > {
    return this.http.get<UserOut | ErrorModel >(environment.apiURL + 'user/find/'+id);
  }
  /**
   * Permet de chercher l'image d'un utilisateurs via son id
   * @param id number, id de l'utilisateurs
   * @returns l'image de l'utilisateurs associé à l'id ou error
   */
  public getImgUserByID(id:number): Observable<ImgUser | ErrorModel > {
    return this.http.get<ImgUser | ErrorModel >(environment.apiURL + 'user/findimg/'+id);
  }
  /**
   * Permet de supprimer l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public deleteUserByID(id:number): Observable< UserOut | ErrorModel > {
    return this.http.delete< UserOut | ErrorModel >(environment.apiURL + 'user/delete/'+id);
  }
  /**
   * Permet d'activer l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchActivateUser(id:number): Observable< UserIn | ErrorModel > {
    return this.http.patch< UserIn | ErrorModel >(environment.apiURL + 'user/activate/'+id,null);
  }
  /**
   * Permet désactiver l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchDesactivateUser(id:number): Observable< UserIn | ErrorModel > {
    return this.http.patch< UserIn | ErrorModel >(environment.apiURL + 'user/desactivate/'+id,null);
  }
  /**
   * Permet de mettre à jour l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Les données l'utilisateurs associé à l'id ou error
   */
  public patchUpdateUser(id:number): Observable< UserIn | ErrorModel > {
    return this.http.patch< UserIn | ErrorModel >(environment.apiURL + 'user/upadate/'+id,null);
  }
  /**
   * Permet de mettre à jour l'img l'utilisateur
   * @param id number, id de l'utilisateurs
   * @returns Limg de l 'utilisateur associé à l'id ou error
   */
  public patchUpdateImgUser(id:number): Observable< ImageModel | ErrorModel > {
    return this.http.patch< ImageModel | ErrorModel >(environment.apiURL + 'user/upadateimg/'+id,null);
  }

  /**
   * Permet de créditer le wallet de l'utilisateur via son id
   * @param id number, id de l'utilisateur
   * @param amount number, la somme que l'on souhaite créditer
   * @returns Les informations de l'utilisateurs 
   */
  public postUserCredit(id:number, amount:number):Observable< UserOut | ErrorModel > {
    return this.http.post< UserOut | ErrorModel >(environment.apiURL + 'user/credit/'+id,null);
  }

  /**
   * Permet de débiter le wallet de l'utilisateur via son id
   * @param id number, id de l'utilisateur
   * @param amount number, la somme que l'on souhaite debiter
   * @returns Les informations de l'utilisateurs 
   */
  public postUserDebit(id:number, amount:number):Observable< UserOut | ErrorModel > {
    return this.http.post< UserOut | ErrorModel >(environment.apiURL + 'user/debit/'+id,null);
  }

  /**
   * Enregistrer un utilisateur via le post
   * @param user utilisateur que l'on souhaite inscire
   * @returns Les informations de l'utilisateurs 
   */
  public postregisterUser(user:UserIn):Observable< UserOut | ErrorModel > {
    return this.http.post< UserOut | ErrorModel >(environment.apiURL + 'user/register',user);
  }

  /**
   * Enregistrer un utilisateur via le put
   * @param user utilisateur que l'on souhaite inscire
   * @returns Les informations de l'utilisateurs 
   */
  public putregisterUser(user:any):Observable< UserOut | ErrorModel > {
    return this.http.put< UserOut | ErrorModel >(environment.apiURL + 'user/register',user);
  }
}
