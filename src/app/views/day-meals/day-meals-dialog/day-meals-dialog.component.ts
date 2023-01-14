import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meal } from '@shared/models/meal.model';
import { DayMealsComponent } from '../day-meals.component';

@Component({
  selector: 'app-day-meals-dialog',
  templateUrl: './day-meals-dialog.component.html',
  styleUrls: ['./day-meals-dialog.component.scss']
})
export class DayMealsDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DayMealsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {day: string, meal: Meal[]}
  ) {
    
  }
}
