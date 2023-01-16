import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient, Meal } from '@shared/models/meal.model';
import { MealService } from '@shared/services/meal.service';
import {Image} from "@shared/models/image.model";

@Component({
  selector: 'app-week-menus-manager',
  templateUrl: './week-menus-manager.component.html',
  styleUrls: ['./week-menus-manager.component.scss']
})
export class WeekMenusManagerComponent {

  meals: Meal[] = [];
  updatedMeals: Meal[] = [];
  lundiMeals: number[] = [];
  mardiMeals: number[] = [];
  mercrediMeals: number[] = [];
  jeudiMeals: number[] = [];
  vendrediMeals: number[] = [];
  allDaysMeals: number[] = [];
  public selectedMeals!: FormGroup;

  constructor(private mealService: MealService) {
  }

  ngOnInit(): void {
    this.selectedMeals = new FormGroup({
      lundiMeal1: new FormControl(),
      lundiMeal2: new FormControl(),
      mardiMeal1: new FormControl(),
      mardiMeal2: new FormControl(),
      mercrediMeal1: new FormControl(),
      mercrediMeal2: new FormControl(),
      jeudiMeal1: new FormControl(),
      jeudiMeal2: new FormControl(),
      vendrediMeal1: new FormControl(),
      vendrediMeal2: new FormControl()
    });
    this.getAllMeal();
    //this.resetMeal();
  }

  getAllMeal() {
    this.mealService.getAllMeal().subscribe((meals: Meal[]) => {
      this.meals.push(...meals);
    })
  }

  // resetMeal() {
  //   this.mealService.getAllMeal().subscribe((meals: Meal[]) => {
  //     meals.forEach(meal => {
  //       meal.availableForWeeksAndDays.values = [{week:1, day:1}];
  //       this.mealService.updateMeal(meal.id!,meal).subscribe(data => {

  //       })
  //     });
  //   })
  // }

  saveMeals() {
    this.lundiMeals.push(
      this.selectedMeals.value.lundiMeal1, this.selectedMeals.value.lundiMeal2
    );
    this.mardiMeals.push(
      this.selectedMeals.value.mardiMeal1, this.selectedMeals.value.mardiMeal2
    );
    this.mercrediMeals.push(
      this.selectedMeals.value.mercrediMeal1, this.selectedMeals.value.mercrediMeal2
    );
    this.jeudiMeals.push(
      this.selectedMeals.value.jeudiMeal1, this.selectedMeals.value.jeudiMeal2
    );
    this.vendrediMeals.push(
      this.selectedMeals.value.vendrediMeal1, this.selectedMeals.value.vendrediMeal2
    )
    const allDaysMeals = [
      this.lundiMeals,
      this.mardiMeals,
      this.mercrediMeals,
      this.jeudiMeals,
      this.vendrediMeals
    ]

    this.updateWeekAndDayAvailability(allDaysMeals);
  }



  updateWeekAndDayAvailability(allDaysMeals: number[][]) {
    for(let i=0; i<7; i++) {
      this.mealService.getMealAvailableForWeekAndDay(this.getWeekNumber(),i+1,3).subscribe((meals: Meal[]) => {
        meals.forEach(meal => {
          meal.availableForWeeksAndDays.values = [{week:1,day:7}];
          this.mealService.updateMeal(meal.id!, meal);
        });
      })
    }
    for(let i=0; i<allDaysMeals.length; i++) {
      for(let j=0; j<allDaysMeals[i].length; j++) {
        if(allDaysMeals[i][j] != null) {
          this.mealService.getMealByID(allDaysMeals[i][j]).subscribe((meal: Meal) => {
            meal.availableForWeeksAndDays.values = [
              {
                week: this.getWeekNumber(),
                day: i+1
              }
            ]
            this.mealService.updateMeal(meal.id!, meal).subscribe((meal: Meal) => {
              console.log(meal);
            })
          })
        }
      }
    }

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
