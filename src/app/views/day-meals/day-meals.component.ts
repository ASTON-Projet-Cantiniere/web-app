import {Component, Inject} from '@angular/core';
import {Meal, WeekMeals} from 'src/app/shared/models/meal.model';
import {MealService} from '@shared/services/meal.service';
import {Image} from "@shared/models/image.model";
import {CartService} from "@shared/services/cart.service";
import {CartItem, WeekDay} from "@shared/models/cart-item.model";

@Component({
  selector: 'app-day-meals',
  templateUrl: './day-meals.component.html',
  styleUrls: ['./day-meals.component.scss']
})
export class DayMealsComponent {

  meals: Meal[] = [];
  weekMeals: WeekMeals[] = [];

  constructor(@Inject('API_URL') private baseUrl: string,
              private mealService: MealService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.mealService.getAllMealForThisWeek(3).subscribe((meals: Meal[]) => {
      meals.forEach((meal: Meal, index: number) => {
        this.mealService.getMealImageByID(meal.id!).subscribe((image: Image) => {
          meal.imagePath = `${this.baseUrl}/${image.imagePath!}`;
        });
      });
      this.meals.push(...meals);
      this.addTwoMealsPerDay(meals);
    });
  }

  /**
   * attribue 2 plats par jour
   * @param meals un tableau contenant tous les plats de la semaine
   */
  addTwoMealsPerDay(meals: Meal[]) {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'] as WeekDay[];
    let index = 0;
    days.forEach((day: WeekDay) => {
      const weekMeals: WeekMeals = {
        day: day,
        meals: [meals[index], meals[index + 1]]
      };
      this.weekMeals.push(weekMeals);
      index += 2;
    });
  }

  onAddToCart(meal: Meal, day: WeekDay) {
    const cartItem = {
      meal: meal,
      menu: null,
      quantity: 1,
      day: day
    };
    this.cartService.addItemToCart(cartItem);
  }
}
