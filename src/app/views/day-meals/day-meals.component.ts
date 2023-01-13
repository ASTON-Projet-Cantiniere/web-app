import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Meal, DayMeal, weekDay } from 'src/app/shared/models/meal.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';
import { MealModalComponent } from './meal-modal/meal-modal.component';
import {Component, OnInit} from '@angular/core';
import {Meal} from "@shared/models/meal.model";
import {MealService} from "@shared/services/manager/meal.service";
import {Image} from "@shared/models/image.model";

@Component({
  selector: 'app-day-meals',
  templateUrl: './day-meals.component.html',
  styleUrls: ['./day-meals.component.scss']
})
export class DayMealsComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private mealService: MealService) {
    this.mealService.getAllMealAvailableForToday().subscribe((data) =>
      this.meals.push(...data));
  }

  ngOnInit(): void {
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
    });
  }

  getMealByID(id: number) {
    this.mealService.getMealByID(id).subscribe((data: Meal) => {
      console.log(data);
    })
  }

  deleteMealByID(id: number) {
    this.mealService.deleteMealByID(id).subscribe((data: Meal) => {
      console.log(data);
    })
  }

  openDialog(jour: string, meal: Meal[]) {
    const dialogRef = this.dialog.open(MealModalComponent, {
      data: {
        day: jour,
        meal: meal //TODO
      }
    });

  getMealImageByID(id: number) {
    this.mealService.getMealImageByID(id).subscribe((data: Image) => {
      console.log(data);
    })
  }

  addMeal(meal: Meal) {
    this.mealService.addMeal(meal).subscribe((data: Meal) => {
      console.log(data);

    })
  }

}
