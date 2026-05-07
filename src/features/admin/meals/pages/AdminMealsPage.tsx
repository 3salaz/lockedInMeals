import { useState } from "react";

import { createMealItem } from "@/features/meals/services/mealService";
import { useMealItems } from "@/features/meals/hooks/useMealItems";
import type { DietaryTag, MealItemFormData } from "@/features/meals/types/meal.types";

const dietaryTagOptions: DietaryTag[] = [
    "high-protein",
    "low-carb",
    "gluten-free",
    "dairy-free",
    "vegetarian",
    "vegan",
    "spicy",
    "balanced",
];

const emptyMealForm: MealItemFormData = {
    name: "",
    description: "",
    imageUrl: "",
    dietaryTags: [],
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    price: "",
    active: true,
};

export default function AdminMealsPage() {
    const { mealItems, loadingMealItems, mealItemsError, reloadMealItems } =
        useMealItems();

    const [formData, setFormData] = useState<MealItemFormData>(emptyMealForm);
    const [saving, setSaving] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setSaving(true);
            await createMealItem(formData);
            setFormData(emptyMealForm);
            await reloadMealItems();
        } finally {
            setSaving(false);
        }
    }

    function toggleTag(tag: DietaryTag) {
        setFormData((current) => ({
            ...current,
            dietaryTags: current.dietaryTags.includes(tag)
                ? current.dietaryTags.filter((item) => item !== tag)
                : [...current.dietaryTags, tag],
        }));
    }

    return (
        <section className="text-(--color-text)">
            <header className="mb-8 border-b border-(--color-border) pb-6">
                <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent)">
                    Meal Inventory
                </p>

                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                    Manage Meal Items
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                    Add reusable meals here. Later, you can assign these meals to a weekly
                    menu.
                </p>
            </header>

            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6"
                >
                    <h2 className="text-xl font-semibold">Add Meal</h2>

                    <div className="mt-6 grid gap-4">
                        <input
                            required
                            value={formData.name}
                            onChange={(event) =>
                                setFormData({ ...formData, name: event.target.value })
                            }
                            placeholder="Meal name"
                            className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm outline-none focus:border-(--color-accent)"
                        />

                        <textarea
                            required
                            value={formData.description}
                            onChange={(event) =>
                                setFormData({ ...formData, description: event.target.value })
                            }
                            placeholder="Meal description"
                            rows={4}
                            className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm outline-none focus:border-(--color-accent)"
                        />

                        <input
                            value={formData.imageUrl}
                            onChange={(event) =>
                                setFormData({ ...formData, imageUrl: event.target.value })
                            }
                            placeholder="Image URL"
                            className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm outline-none focus:border-(--color-accent)"
                        />

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {(["calories", "protein", "carbs", "fat"] as const).map((key) => (
                                <input
                                    key={key}
                                    type="number"
                                    min="0"
                                    value={formData[key]}
                                    onChange={(event) =>
                                        setFormData({ ...formData, [key]: event.target.value })
                                    }
                                    placeholder={key}
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm outline-none focus:border-(--color-accent)"
                                />
                            ))}
                        </div>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(event) =>
                                setFormData({ ...formData, price: event.target.value })
                            }
                            placeholder="Price"
                            className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm outline-none focus:border-(--color-accent)"
                        />

                        <div>
                            <p className="mb-3 text-sm font-medium">Dietary Tags</p>

                            <div className="flex flex-wrap gap-2">
                                {dietaryTagOptions.map((tag) => {
                                    const selected = formData.dietaryTags.includes(tag);

                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag(tag)}
                                            className={[
                                                "rounded-full border px-3 py-2 text-xs transition",
                                                selected
                                                    ? "border-(--color-accent) bg-(--color-accent) text-(--color-background)"
                                                    : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent)",
                                            ].join(" ")}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full bg-(--color-accent) px-5 py-3 text-sm font-semibold text-(--color-background) disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Add Meal"}
                        </button>
                    </div>
                </form>

                <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
                    <h2 className="text-xl font-semibold">Inventory</h2>

                    {loadingMealItems && (
                        <p className="mt-4 text-sm text-(--color-text-muted)">
                            Loading meals...
                        </p>
                    )}

                    {mealItemsError && (
                        <p className="mt-4 text-sm text-red-300">{mealItemsError}</p>
                    )}

                    <div className="mt-6 grid gap-4">
                        {mealItems.map((meal) => (
                            <article
                                key={meal.id}
                                className="rounded-2xl border border-(--color-border) bg-(--color-background) p-4"
                            >
                                <h3 className="font-semibold">{meal.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                                    {meal.description}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {meal.dietaryTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-muted)"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}