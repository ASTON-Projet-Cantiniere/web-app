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
