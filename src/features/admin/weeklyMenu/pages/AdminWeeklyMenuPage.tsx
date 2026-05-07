import { useMemo, useState } from "react";

import { useMealItems } from "@/features/meals/hooks/useMealItems";
import { saveWeeklyMenu } from "@/features/weeklyMenu/services/weeklyMenuService";
import { useWeeklyMenus } from "@/features/weeklyMenu/hooks/useWeeklyMenus";
import type { WeeklyMenu } from "@/features/weeklyMenu/types/weeklyMenu.types";

import type {
    WeeklyMenuFormData,
    WeeklyMenuStatus,
} from "@/features/weeklyMenu/types/weeklyMenu.types";

function getMonday(date: Date) {
    const next = new Date(date);
    const day = next.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    next.setDate(next.getDate() + diff);
    next.setHours(0, 0, 0, 0);

    return next;
}

function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

function formatDateValue(date: Date) {
    return date.toISOString().slice(0, 10);
}

function getNextFourWeekOptions() {
    const firstMonday = getMonday(new Date());

    return Array.from({ length: 4 }, (_, index) => {
        const startDate = new Date(firstMonday);
        startDate.setDate(firstMonday.getDate() + index * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return {
            value: formatDateValue(startDate),
            label: `Mon–Sun | ${formatDate(startDate)} – ${formatDate(endDate)}`,
        };
    });
}

export default function AdminWeeklyMenuPage() {
    const { mealItems, loadingMealItems, mealItemsError } = useMealItems();
    const {
        weeklyMenus,
        loadingWeeklyMenus,
        weeklyMenusError,
        reloadWeeklyMenus,
    } = useWeeklyMenus();

    const weekOptions = useMemo(() => getNextFourWeekOptions(), []);

    const [formData, setFormData] = useState<WeeklyMenuFormData>({
        weekStartDate: weekOptions[0]?.value ?? "",
        status: "draft",
        featuredMealId: "",
        mealIds: [],
        pricePerMeal: "14",
        addons: "Extra Protein $3\nExtra Carbs $2\nLow Carb Swap Available",
        orderDeadline: "Sunday 5PM",
        pickupDeliveryText: "Pick Up & Delivery Tuesday",
        deliveryAreas: "San Francisco\nPeninsula\nSan Jose\nEast Bay",
        pickupAreas: "San Francisco\nSan Bruno",
    });

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const canPublish =
        Boolean(formData.weekStartDate) &&
        Boolean(formData.featuredMealId) &&
        formData.mealIds.length > 0 &&
        Boolean(formData.pricePerMeal) &&
        Boolean(formData.orderDeadline);

    function toggleMeal(mealId: string) {
        setMessage("");

        setFormData((current) => ({
            ...current,
            mealIds: current.mealIds.includes(mealId)
                ? current.mealIds.filter((id) => id !== mealId)
                : [...current.mealIds, mealId],
        }));
    }

    async function handleSave(status: WeeklyMenuStatus) {
        if (status === "published" && !canPublish) {
            setMessage("Add a featured meal, at least one menu item, price, and deadline before publishing.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");

            await saveWeeklyMenu({
                ...formData,
                status,
            });

            setFormData((current) => ({
                ...current,
                status,
            }));

            setMessage(
                status === "published"
                    ? "Weekly menu published."
                    : "Weekly menu saved as draft.",
            );
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Failed to save weekly menu.",
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="text-(--color-text)">
            <header className="mb-8 border-b border-(--color-border) pb-6">
                <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent)">
                    Weekly Menu
                </p>

                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                    Build Weekly Menu
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                    Create the weekly menu board customers will see on the public website.
                </p>
            </header>

            {mealItemsError && (
                <p className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {mealItemsError}
                </p>
            )}

            {message && (
                <p className="mb-6 rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-accent)">
                    {message}
                </p>
            )}

            <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
                <div className="space-y-6">
                    <section className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-5">
                        <h2 className="text-xl font-semibold">Menu Details</h2>

                        <div className="mt-5 grid gap-4">
                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Select Week</span>
                                <select
                                    value={formData.weekStartDate}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            weekStartDate: event.target.value,
                                        }))
                                    }
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                >
                                    {weekOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Price Per Meal</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.pricePerMeal}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            pricePerMeal: event.target.value,
                                        }))
                                    }
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Add-ons</span>
                                <textarea
                                    value={formData.addons}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            addons: event.target.value,
                                        }))
                                    }
                                    rows={4}
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Order Deadline</span>
                                <input
                                    value={formData.orderDeadline}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            orderDeadline: event.target.value,
                                        }))
                                    }
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Pickup / Delivery Text</span>
                                <input
                                    value={formData.pickupDeliveryText}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            pickupDeliveryText: event.target.value,
                                        }))
                                    }
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Delivery Areas</span>
                                <textarea
                                    value={formData.deliveryAreas}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            deliveryAreas: event.target.value,
                                        }))
                                    }
                                    rows={4}
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-medium">Pickup Areas</span>
                                <textarea
                                    value={formData.pickupAreas}
                                    onChange={(event) =>
                                        setFormData((current) => ({
                                            ...current,
                                            pickupAreas: event.target.value,
                                        }))
                                    }
                                    rows={3}
                                    className="rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 outline-none focus:border-(--color-accent)"
                                />
                            </label>
                        </div>
                    </section>
                </div>

                <section className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-5">
                    <h2 className="text-xl font-semibold">Select Meals</h2>

                    <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                        Choose one featured item and select the meals that should appear on this week’s menu.
                    </p>

                    {loadingMealItems ? (
                        <p className="mt-6 text-sm text-(--color-text-muted)">
                            Loading meals...
                        </p>
                    ) : (
                        <div className="mt-6 grid gap-4">
                            {mealItems.map((meal) => {
                                const isFeatured = formData.featuredMealId === meal.id;
                                const isSelected = formData.mealIds.includes(meal.id);

                                return (
                                    <article
                                        key={meal.id}
                                        className="rounded-2xl border border-(--color-border) bg-(--color-background) p-4"
                                    >
                                        <div className="flex gap-3">
                                            {meal.imageUrl && (
                                                <img
                                                    src={meal.imageUrl}
                                                    alt={meal.name}
                                                    className="h-20 w-20 rounded-xl object-cover"
                                                />
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold">{meal.name}</h3>

                                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-(--color-text-muted)">
                                                    {meal.description}
                                                </p>

                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData((current) => ({
                                                                ...current,
                                                                featuredMealId: isFeatured ? "" : meal.id,
                                                                mealIds: current.mealIds.includes(meal.id)
                                                                    ? current.mealIds
                                                                    : [...current.mealIds, meal.id],
                                                            }))
                                                        }
                                                        className={[
                                                            "rounded-full border px-3 py-2 text-xs font-medium transition",
                                                            isFeatured
                                                                ? "border-(--color-accent) bg-(--color-accent) text-(--color-background)"
                                                                : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent)",
                                                        ].join(" ")}
                                                    >
                                                        {isFeatured ? "Featured" : "Set Featured"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => toggleMeal(meal.id)}
                                                        className={[
                                                            "rounded-full border px-3 py-2 text-xs font-medium transition",
                                                            isSelected
                                                                ? "border-(--color-accent) bg-(--color-surface-muted) text-(--color-accent)"
                                                                : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent)",
                                                        ].join(" ")}
                                                    >
                                                        {isSelected ? "On Menu" : "Add To Menu"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            <div className="sticky bottom-4 mt-8 flex flex-col gap-3 rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-(--color-text-muted)">
                    {canPublish
                        ? "Ready to publish."
                        : "Add a featured meal, menu items, price, and order deadline to publish."}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => void handleSave("draft")}
                        disabled={saving}
                        className="rounded-full border border-(--color-border) px-5 py-3 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-muted) disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                        type="button"
                        onClick={() => void handleSave("published")}
                        disabled={saving || !canPublish}
                        className="rounded-full bg-(--color-accent) px-5 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Publishing..." : "Publish Menu"}
                    </button>
                </div>
            </div>
        </section>
    );
}