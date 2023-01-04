import { Component } from '@angular/core';
import {Meal} from "@shared/models/meal.model";
import {MealService} from "@shared/services/manager/meal.service";
import {Img} from "@shared/models/img.model";

@Component({
  selector: 'app-week-meals',
  templateUrl: './week-meals.component.html',
  styleUrls: ['./week-meals.component.scss']
})
export class WeekMealsComponent {
  meals: Meal[] =[];

  constructor(private mealService: MealService) {
  }

  getAllMeal() {
    this.mealService.getAllMeal().subscribe((data: Meal[]) => {
      this.meals.push(...data);
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

  getMealImageByID(id: number) {
    this.mealService.getMealImageByID(id).subscribe((data: Img) => {
      console.log(data);

    })
  }

  addMeal(meal: Meal) {
    this.mealService.addMeal(meal).subscribe((data: Meal) => {
      console.log(data);

    })
  }
}
