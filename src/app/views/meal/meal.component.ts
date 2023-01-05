import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Meal, DayMeal, weekDay } from 'src/app/shared/models/meal.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';
import { MealModalComponent } from './meal-modal/meal-modal.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  meals: Meal[] = [];
  dayMeals!: DayMeal;
  weekMeals: DayMeal[] = [];
  


  constructor(private mealService: MealService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllMealForThisWeek();
  }

  getAllMealForThisWeek() {
    this.mealService.getAllMealForThisWeek(3).subscribe(data => {
      this.meals.push(...data);
      let j = 0;
      for(let i=0; i<weekDay.length - 2; i++) {
        this.dayMeals = {
          day: weekDay[i].day,
          meal: [this.meals[j],this.meals[j+1]]
        }
        j=j+2;
        this.weekMeals.push(this.dayMeals);
      }
    })
  }

  openDialog(jour: string, meal: Meal[]) {
    const dialogRef = this.dialog.open(MealModalComponent, {
      data: {
        day: jour,
        meal: meal //TODO
      }
    });
  }

}
