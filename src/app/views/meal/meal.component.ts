import { Component } from '@angular/core';
import { Img } from 'src/app/shared/models/img.model';
import { Ingredient, Meal } from 'src/app/shared/models/meal.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

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
