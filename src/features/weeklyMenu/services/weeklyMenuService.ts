import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type { WeeklyMenu, WeeklyMenuFormData } from "../types/weeklyMenu.types";

const weeklyMenusCollection = collection(db, "weeklyMenus");

function splitLines(value: string) {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

function cleanWeeklyMenuFormData(data: WeeklyMenuFormData) {
    return {
        weekStartDate: data.weekStartDate,
        status: data.status,
        featuredMealId: data.featuredMealId,
        mealIds: data.mealIds,
        pricePerMeal: Number(data.pricePerMeal) || 0,
        addons: splitLines(data.addons),
        orderDeadline: data.orderDeadline.trim(),
        pickupDeliveryText: data.pickupDeliveryText.trim(),
        deliveryAreas: splitLines(data.deliveryAreas),
        pickupAreas: splitLines(data.pickupAreas),
    };
}

export async function getWeeklyMenus(): Promise<WeeklyMenu[]> {
    const weeklyMenusQuery = query(
        weeklyMenusCollection,
        orderBy("weekStartDate", "desc"),
    );

    const snapshot = await getDocs(weeklyMenusQuery);

    return snapshot.docs.map((menuDoc) => ({
        id: menuDoc.id,
        ...menuDoc.data(),
    })) as WeeklyMenu[];
}

export async function getPublishedWeeklyMenu(): Promise<WeeklyMenu | null> {
    const publishedMenuQuery = query(
        weeklyMenusCollection,
        where("status", "==", "published"),
        orderBy("weekStartDate", "desc"),
        limit(1),
    );

    const snapshot = await getDocs(publishedMenuQuery);

    if (snapshot.empty) return null;

    const menuDoc = snapshot.docs[0];

    return {
        id: menuDoc.id,
        ...menuDoc.data(),
    } as WeeklyMenu;
}

export async function saveWeeklyMenu(data: WeeklyMenuFormData) {
    const cleanData = cleanWeeklyMenuFormData(data);
    const menuId = cleanData.weekStartDate;

    return setDoc(
        doc(db, "weeklyMenus", menuId),
        {
            ...cleanData,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        },
        { merge: true },
    );
}