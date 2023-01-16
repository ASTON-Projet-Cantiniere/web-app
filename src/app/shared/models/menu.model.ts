import {Meal} from "./meal.model";

export interface Menu {
  id?: number;
  description?: string;
  label: string;
  status: number;
  imageId: number;
  priceDF: number;
  availableForWeeksAndDays: any;
  meals: Meal[];
}

export interface AddMenu {
  description?: string;
  label: string;
  image: Image;
  priceDF: number;
  availableForWeeksAndDays: any;
  mealIds: number[];
}

export interface Image {
  imagePath: string;
  image64: string;
}
