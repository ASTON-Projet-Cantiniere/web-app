import { Component } from '@angular/core';
import { DayMeal, Meal, WeekMeals } from 'src/app/shared/models/meal.model';
import { Image } from '@shared/models/image.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';
import { environment } from '@env';

@Component({
  selector: 'app-day-meals',
  templateUrl: './day-meals.component.html',
  styleUrls: ['./day-meals.component.scss']
})
export class DayMealsComponent {

  url = environment.apiURL;
  meals: Meal[] =[];
  dayMeal!: DayMeal;
  dayMeals: DayMeal[] = [];
  weekMeals: WeekMeals[] = [];
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private mealService: MealService) {
  }

  ngOnInit(): void {
    this.getAllMealForThisWeek();
  }

  getAllMealForThisWeek() {
    this.mealService.getAllMealForThisWeek(3).subscribe((meals: Meal[]) => {
      meals.forEach((meal: Meal, index: number) => {
        this.mealService.getMealImageByID(meal.id!).subscribe((image: Image) => {
          meal.imagePath = `${this.url}/${image.imagePath!}`;
        });
      });
      this.meals.push(...meals);
      console.log(this.meals[0]);
      
      this.addTwoMealsPerDay(this.meals);
    });
  }

  addTwoMealsPerDay(meals: Meal[]) {
    let j=0
    for(let i=0; i<this.weekDays.length - 2; i++) {
      this.weekMeals.push({
        day: this.weekDays[i],
        meals: [meals[j],meals[j+1]]
      })
      j+=2;
    }
    console.log(this.weekMeals);
  }

  openDialog(day: string, meals: Meal[]) {

  }

}
