export type WeeklyMenuStatus = "draft" | "published";

export type WeeklyMenu = {
    id: string;
    weekStartDate: string;
    status: WeeklyMenuStatus;

    featuredMealId: string;
    mealIds: string[];

    pricePerMeal: number;
    addons: string[];

    orderDeadline: string;
    pickupDeliveryText: string;
    deliveryAreas: string[];
    pickupAreas: string[];

    createdAt?: Date;
    updatedAt?: Date;
};

export type WeeklyMenuFormData = {
    weekStartDate: string;
    status: WeeklyMenuStatus;

    featuredMealId: string;
    mealIds: string[];

    pricePerMeal: string;
    addons: string;

    orderDeadline: string;
    pickupDeliveryText: string;
    deliveryAreas: string;
    pickupAreas: string;
};