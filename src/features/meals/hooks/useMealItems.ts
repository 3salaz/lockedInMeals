import { useEffect, useState } from "react";

import { getMealItems } from "../services/mealService";
import type { MealItem } from "../types/meal.types";

export function useMealItems() {
    const [mealItems, setMealItems] = useState<MealItem[]>([]);
    const [loadingMealItems, setLoadingMealItems] = useState(true);
    const [mealItemsError, setMealItemsError] = useState("");

    async function loadMealItems() {
        try {
            setLoadingMealItems(true);
            setMealItemsError("");

            const items = await getMealItems();
            setMealItems(items);
        } catch (error) {
            setMealItemsError(
                error instanceof Error ? error.message : "Failed to load meal items.",
            );
        } finally {
            setLoadingMealItems(false);
        }
    }

    useEffect(() => {
        void loadMealItems();
    }, []);

    return {
        mealItems,
        loadingMealItems,
        mealItemsError,
        reloadMealItems: loadMealItems,
    };
}