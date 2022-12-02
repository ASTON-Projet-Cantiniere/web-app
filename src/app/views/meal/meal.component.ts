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

  ingredients: Ingredient[] = [{
    id: 0,
    description: "Kebab de poulet",
    label: "poulet",
    status: 0,
    imageId: 0
  }];

  img: Img = {
    id: 0,
    imagePath: "img/toto.png",
    image64: "see https://www.base64-image.de/",
    default: true
  };
  
  newMeal: Meal = {
    label: "keab",
    status: 0,
    imageId:  2,
    priceDF: 2,
    availableForWeeksAndDays: {
      "values": [
        {
          "week": 0,
          "day": 0
        }
      ]
    },
    category: 1,
    ingredients: this.ingredients
  };

  constructor(private mealService: MealService) {
    this.addMeal(this.newMeal);
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
