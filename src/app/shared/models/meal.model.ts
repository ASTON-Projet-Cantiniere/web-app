export interface Meal {
    id: number;
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

export type DayMeal = {
    day: string,
    meal: Meal[]
}

export const weekDay = [
    {
        id: 0,
        day: 'Lundi'
    },
    {
        id: 1,
        day: 'Mardi'
    },
    {
        id: 2,
        day: 'Mercredi'
    },
    {
        id: 3,
        day: 'Jeudi'
    },
    {
        id: 4,
        day: 'Vendredi'
    },
    {
        id: 5,
        day: 'Samedi'
    },
    {
        id: 6,
        day: 'Dimanche'
    }
]