import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type { DietaryTag } from "@/features/meals/types/meal.types";
import { saveWeeklyMenu } from "@/features/weeklyMenu/services/weeklyMenuService";

const SEED_WEEK_START = "2026-06-02";

type SeedMeal = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    dietaryTags: DietaryTag[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    price: number;
    active: boolean;
};

const seedMeals: SeedMeal[] = [
    {
        id: "seed-teriyaki-chicken-bowl",
        name: "Teriyaki Chicken Bowl",
        description:
            "Juicy grilled chicken thighs glazed in a house-made teriyaki sauce served over brown rice with steamed broccoli and edamame.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["high-protein", "balanced"],
        calories: 520,
        protein: 42,
        carbs: 52,
        fat: 12,
        price: 14,
        active: true,
    },
    {
        id: "seed-mediterranean-turkey-meatballs",
        name: "Mediterranean Turkey Meatballs",
        description:
            "Herb-spiced turkey meatballs over cauliflower rice with roasted cherry tomatoes, cucumber, and a lemon-garlic drizzle.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["high-protein", "gluten-free"],
        calories: 480,
        protein: 38,
        carbs: 22,
        fat: 22,
        price: 14,
        active: true,
    },
    {
        id: "seed-lemon-herb-salmon",
        name: "Lemon Herb Salmon & Veggies",
        description:
            "Atlantic salmon fillet seasoned with fresh dill and lemon zest, paired with roasted asparagus and sweet potato.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["high-protein", "gluten-free", "dairy-free"],
        calories: 440,
        protein: 36,
        carbs: 28,
        fat: 18,
        price: 14,
        active: true,
    },
    {
        id: "seed-black-bean-sweet-potato-bowl",
        name: "Black Bean & Sweet Potato Bowl",
        description:
            "Seasoned black beans and roasted sweet potato over cilantro-lime quinoa with avocado, pico de gallo, and a chipotle tahini drizzle.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["vegetarian", "vegan", "balanced"],
        calories: 490,
        protein: 18,
        carbs: 72,
        fat: 12,
        price: 14,
        active: true,
    },
    {
        id: "seed-beef-broccoli-stir-fry",
        name: "Beef & Broccoli Stir Fry",
        description:
            "Lean sirloin strips and crispy broccoli florets in a savory ginger-soy glaze over jasmine rice.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["high-protein", "low-carb"],
        calories: 460,
        protein: 40,
        carbs: 16,
        fat: 26,
        price: 14,
        active: true,
    },
    {
        id: "seed-thai-peanut-tofu-bowl",
        name: "Thai Peanut Tofu Bowl",
        description:
            "Crispy baked tofu with shredded purple cabbage, carrots, cucumber, and rice noodles tossed in a creamy peanut-lime sauce.",
        imageUrl: "placeholder.co/600x400",
        dietaryTags: ["vegan", "vegetarian"],
        calories: 500,
        protein: 22,
        carbs: 56,
        fat: 22,
        price: 14,
        active: true,
    },
];

export async function seedDemoData() {
    await Promise.all(
        seedMeals.map((meal) =>
            setDoc(
                doc(db, "mealItems", meal.id),
                {
                    name: meal.name,
                    description: meal.description,
                    imageUrl: meal.imageUrl,
                    dietaryTags: meal.dietaryTags,
                    calories: meal.calories,
                    protein: meal.protein,
                    carbs: meal.carbs,
                    fat: meal.fat,
                    price: meal.price,
                    active: meal.active,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                { merge: true },
            ),
        ),
    );

    await saveWeeklyMenu({
        weekStartDate: SEED_WEEK_START,
        status: "published",
        featuredMealId: seedMeals[0].id,
        mealIds: seedMeals.map((m) => m.id),
        pricePerMeal: "14",
        addons: "Extra Protein +$3\nExtra Carbs +$2\nLow Carb Swap Available",
        orderDeadline: "Sunday 5PM",
        pickupDeliveryText: "Pick Up & Delivery Tuesday",
        deliveryAreas: "San Francisco\nPeninsula\nSan Jose\nEast Bay",
        pickupAreas: "San Francisco\nSan Bruno",
    });
}
