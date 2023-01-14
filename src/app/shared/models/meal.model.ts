export interface Meal {
  id?: number;
  label: string;
  status: number;
  imageId: number;
  imagePath: string;
  priceDF: number;
  availableForWeeksAndDays: {
    values: [
      {
        week: number,
        day: number
      }
    ]
  };
  category: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  description: string;
  label: string;
  status: number;
  imageId: number;
}

export type DayMeal = {
  meal: Meal,
  imagePath: string
}

export type WeekMeals = {
  day: string,
  meals: Meal[]
}

export const WeekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
