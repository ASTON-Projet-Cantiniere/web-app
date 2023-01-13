import { Component } from '@angular/core';
import { Meal, WeekMeals } from 'src/app/shared/models/meal.model';
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
  weekMeals: WeekMeals[] = [];
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private mealService: MealService) {
  }

  ngOnInit(): void {
    this.getAllMealForThisWeek();
  }

  /**
   * récupération des plats dispo pour la semaine et leur image correspondante
   */
  getAllMealForThisWeek() {
    this.mealService.getAllMealForThisWeek(3).subscribe((meals: Meal[]) => {
      meals.forEach((meal: Meal, index: number) => {
        this.mealService.getMealImageByID(meal.id!).subscribe((image: Image) => {
          meal.imagePath = `${this.url}/${image.imagePath!}`;
        });
      });
      this.meals.push(...meals);
      
      this.addTwoMealsPerDay(this.meals);
    });
  }

  /**
   * attribue 2 plats par jour
   * @param meals un tableau contenant tous les plats de la semaine
   */
  addTwoMealsPerDay(meals: Meal[]) {
    let j=0
    for(let i=0; i<this.weekDays.length - 2; i++) {
      this.weekMeals.push({
        day: this.weekDays[i],
        meals: [meals[j],meals[j+1]]
      })
      j+=2;
    }
  }

  /**
   * ouvre le modal de selection permettant de choisir sa formule
   * @param {string} day le nom du jour de la semaine
   * @param {Meal[]} meals les 2 plats du jour de la semaine
   */
  openDialog(day: string, meals: Meal[]) {

  }

}
