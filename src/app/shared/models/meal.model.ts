export interface Meal {
    id?: number;
    label: string;
    status: number;
    imageId: number;
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