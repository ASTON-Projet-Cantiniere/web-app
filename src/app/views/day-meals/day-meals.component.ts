import { Component } from '@angular/core';
import { Meal, WeekMeals } from 'src/app/shared/models/meal.model';
import { Image } from '@shared/models/image.model';
import { MealService } from 'src/app/shared/services/manager/meal.service';
import { environment } from '@env';
import { MatDialog } from '@angular/material/dialog';
import { DayMealsDialogComponent } from './day-meals-dialog/day-meals-dialog.component';

@Component({
  selector: 'app-day-meals',
  templateUrl: './day-meals.component.html',
  styleUrls: ['./day-meals.component.scss']
})
export class DayMealsComponent {

  url = environment.apiURL;
  meals: Meal[] =[];
  dayMeals: Meal[] = [];
  allDayMeals: Meal[] = [];
  weekMeals: WeekMeals[] = [];
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private mealService: MealService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllMealForThisWeek();
  }

  getMealForWeekAndDay(week: number, day: number) {
    this.mealService.getMealAvailableForWeekAndDay(week,day,3).subscribe((meals: Meal[]) => {
      meals.forEach(meal => {
        this.mealService.getMealImageByID(meal.id!).subscribe((image: Image) => {
          if(meal.availableForWeeksAndDays.values != null) {
            meal.imagePath = `${this.url}/${image.imagePath!}`;
            this.dayMeals.push(meal);
            console.log(meal);
          }
        })
      });
      this.allDayMeals.push(...this.dayMeals);
      this.meals.push(...meals)
      this.addTwoMealsPerDay(this.meals);
    })
  }

  /**
   * récupération des plats dispo pour la semaine et leur image correspondante
   */
  getAllMealForThisWeek() {
    for(let i=0; i<this.weekDays.length; i++) {
      
      console.log(this.allDayMeals);
      
    }

    // this.mealService.getAllMealForThisWeek(3).subscribe((meals: Meal[]) => {
    //   meals.forEach((meal: Meal, index: number) => {
    //     this.mealService.getMealImageByID(meal.id!).subscribe((image: Image) => {
    //       meal.imagePath = `${this.url}/${image.imagePath!}`;
    //     });
    //   });
    //   this.meals.push(...meals);
      
    //   this.addTwoMealsPerDay(this.meals);
    // });
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
    const dialogRef = this.dialog.open(DayMealsDialogComponent, {
      data: {
        day: day,
        meals: meals
      }
    })
  }

  getWeekNumber(): number {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);

    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7)
  }

}
