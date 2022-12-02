import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ConstraintInterface } from '../../models/constraint.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ConstraintService {

  URL_CONSTRAINT: string = environment.apiURL + '/constraint';

  constructor(private http: HttpClient) {
  }
  
  /**
   * Affiche un contrainte selon son id
   * @param constraintId number
   * @returns Observable
   */
  getConstraint(constraintId: number): Observable<ConstraintInterface>{
    return this.http.get<ConstraintInterface>( this.URL_CONSTRAINT + `/find/${constraintId}` )
  }

  /**
   * Créer une contrainte
   * @param myConstraint Objet de type ConstraintInterface
   * @returns Observable
   */
  setConstraint(myConstraint: ConstraintInterface): Observable<ConstraintInterface>{
    return this.http.put<ConstraintInterface>( this.URL_CONSTRAINT + '/add', 
    {
      myConstraint
    })
  }

}
