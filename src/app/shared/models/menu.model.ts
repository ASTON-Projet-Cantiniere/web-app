import { Meal } from "./meal.model";

export interface Menu {
        id: number;
        description: string;
        label: string;
        status: number;
        imageId: number;
        priceDF: number;
        availableForWeeksAndDays: any;
        meals: Meal[];
}