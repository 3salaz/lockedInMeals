export type DietaryTag =
    | "high-protein"
    | "low-carb"
    | "gluten-free"
    | "dairy-free"
    | "vegetarian"
    | "vegan"
    | "spicy"
    | "balanced";

export type MealItem = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    dietaryTags: DietaryTag[];
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    price?: number;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type MealItemFormData = {
    name: string;
    description: string;
    imageUrl: string;
    dietaryTags: DietaryTag[];
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    price: string;
    active: boolean;
};