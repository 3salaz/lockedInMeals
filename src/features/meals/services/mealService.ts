import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type { MealItem, MealItemFormData } from "../types/meal.types";

const mealsCollection = collection(db, "mealItems");

function cleanMealFormData(data: MealItemFormData) {
    return {
        name: data.name.trim(),
        description: data.description.trim(),
        imageUrl: data.imageUrl.trim(),
        dietaryTags: data.dietaryTags,
        calories: data.calories ? Number(data.calories) : null,
        protein: data.protein ? Number(data.protein) : null,
        carbs: data.carbs ? Number(data.carbs) : null,
        fat: data.fat ? Number(data.fat) : null,
        price: data.price ? Number(data.price) : null,
        active: data.active,
    };
}

export async function getMealItems(): Promise<MealItem[]> {
    const mealsQuery = query(mealsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(mealsQuery);

    return snapshot.docs.map((mealDoc) => ({
        id: mealDoc.id,
        ...mealDoc.data(),
    })) as MealItem[];
}

export async function createMealItem(data: MealItemFormData) {
    const cleanData = cleanMealFormData(data);

    return addDoc(mealsCollection, {
        ...cleanData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function updateMealItem(mealId: string, data: MealItemFormData) {
    const cleanData = cleanMealFormData(data);

    return updateDoc(doc(db, "mealItems", mealId), {
        ...cleanData,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteMealItem(mealId: string) {
    return deleteDoc(doc(db, "mealItems", mealId));
}