import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Meal } from 'src/app/shared/models/meal.model';

@Component({
  selector: 'app-meal-modal',
  templateUrl: './meal-modal.component.html',
  styleUrls: ['./meal-modal.component.scss']
})
export class MealModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MealModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {day: string, meal: Meal[]},
  ) {
    
  }

}
