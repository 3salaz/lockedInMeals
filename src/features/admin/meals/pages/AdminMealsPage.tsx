import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Pencil, Trash2, X } from "lucide-react";

import { createMealItem, deleteMealItem, updateMealItem } from "@/features/meals/services/mealService";
import { useMealItems } from "@/features/meals/hooks/useMealItems";
import type { DietaryTag, MealItem, MealItemFormData } from "@/features/meals/types/meal.types";
import { storage } from "@/lib/firebase/firebase";

const dietaryTagOptions: DietaryTag[] = [
    "high-protein", "low-carb", "gluten-free", "dairy-free",
    "vegetarian", "vegan", "spicy", "balanced",
];

const emptyMealForm: MealItemFormData = {
    name: "", description: "", imageUrl: "", dietaryTags: [],
    calories: "", protein: "", carbs: "", fat: "", price: "", active: true,
};

function mealToFormData(meal: MealItem): MealItemFormData {
    return {
        name: meal.name,
        description: meal.description,
        imageUrl: meal.imageUrl ?? "",
        dietaryTags: meal.dietaryTags,
        calories: meal.calories?.toString() ?? "",
        protein: meal.protein?.toString() ?? "",
        carbs: meal.carbs?.toString() ?? "",
        fat: meal.fat?.toString() ?? "",
        price: meal.price?.toString() ?? "",
        active: meal.active,
    };
}

const inputClass =
    "w-full rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent)";

export default function AdminMealsPage() {
    const { mealItems, loadingMealItems, mealItemsError, reloadMealItems } = useMealItems();

    const [formData, setFormData] = useState<MealItemFormData>(emptyMealForm);
    const [editingMealId, setEditingMealId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploadError, setImageUploadError] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const formRef = useRef<HTMLFormElement | null>(null);

    function handleEdit(meal: MealItem) {
        setEditingMealId(meal.id);
        setFormData(mealToFormData(meal));
        setFormError("");
        setImageUploadError("");
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function handleCancelEdit() {
        setEditingMealId(null);
        setFormData(emptyMealForm);
        setFormError("");
        setImageUploadError("");
    }

    function toggleTag(tag: DietaryTag) {
        setFormData((prev) => ({
            ...prev,
            dietaryTags: prev.dietaryTags.includes(tag)
                ? prev.dietaryTags.filter((t) => t !== tag)
                : [...prev.dietaryTags, tag],
        }));
    }

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageUploadError("");
        if (!file.type.startsWith("image/")) { setImageUploadError("Please upload an image file."); return; }
        if (file.size > 10 * 1024 * 1024) { setImageUploadError("Image must be smaller than 10MB."); return; }
        try {
            setUploadingImage(true);
            const ext = file.name.split(".").pop() || "jpg";
            const imageRef = ref(storage, `site-media/meals/meal-${Date.now()}.${ext}`);
            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);
            setFormData((prev) => ({ ...prev, imageUrl: downloadUrl }));
        } catch (err) {
            console.error(err);
            setImageUploadError("Upload failed. Check Firebase Storage rules.");
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");
        try {
            setSaving(true);
            if (editingMealId) {
                await updateMealItem(editingMealId, formData);
                setEditingMealId(null);
            } else {
                await createMealItem(formData);
            }
            setFormData(emptyMealForm);
            await reloadMealItems();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Failed to save meal.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(mealId: string) {
        try {
            setDeleting(true);
            await deleteMealItem(mealId);
            setDeleteConfirmId(null);
            if (editingMealId === mealId) handleCancelEdit();
            await reloadMealItems();
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    }

    const isEditing = editingMealId !== null;

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
                    Add and manage reusable meals. Assign them to a weekly menu from the Weekly Menu page.
                </p>
            </header>

            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                {/* ── Form ── */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {isEditing ? "Edit Meal" : "Add Meal"}
                        </h2>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) px-3 py-1.5 text-xs text-(--color-text-muted) transition hover:bg-(--color-surface-muted)"
                            >
                                <X size={12} /> Cancel
                            </button>
                        )}
                    </div>

                    <div className="mt-6 grid gap-4">
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Meal name"
                            className={inputClass}
                        />

                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Meal description"
                            rows={4}
                            className={inputClass}
                        />

                        {/* Image upload */}
                        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-medium text-(--color-text)">Meal Image</p>
                                <div className="flex gap-2">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploadingImage}
                                        className="rounded-xl bg-(--color-accent-soft) px-3 py-1.5 text-xs font-medium text-(--color-background) disabled:opacity-60"
                                    >
                                        {uploadingImage ? "Uploading..." : "Upload"}
                                    </button>
                                </div>
                            </div>

                            {imageUploadError && (
                                <p className="mt-2 text-xs text-red-400">{imageUploadError}</p>
                            )}

                            <input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="Or paste image URL"
                                className={inputClass + " mt-3"}
                            />

                            {formData.imageUrl && (
                                <div className="mt-3 overflow-hidden rounded-xl border border-(--color-border)">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Meal preview"
                                        className="h-36 w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Macros */}
                        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                            <p className="mb-3 text-sm font-medium text-(--color-text)">
                                Nutrition Facts{" "}
                                <span className="font-normal text-(--color-text-muted)">per serving</span>
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {([
                                    { key: "calories", label: "Calories", unit: "kcal" },
                                    { key: "protein",  label: "Protein",  unit: "g" },
                                    { key: "carbs",    label: "Carbs",    unit: "g" },
                                    { key: "fat",      label: "Fat",      unit: "g" },
                                ] as const).map(({ key, label, unit }) => (
                                    <label key={key} className="block">
                                        <span className="mb-1.5 flex items-center justify-between text-xs text-(--color-text-muted)">
                                            <span>{label}</span>
                                            <span className="opacity-50">{unit}</span>
                                        </span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData[key]}
                                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                            placeholder="—"
                                            className={inputClass}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <label className="block">
                            <span className="mb-1.5 flex items-center justify-between text-xs text-(--color-text-muted)">
                                <span>Price per meal</span>
                                <span className="opacity-50">USD</span>
                            </span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                                className={inputClass}
                            />
                        </label>

                        {/* Dietary tags */}
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

                        {formError && (
                            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {formError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={saving || uploadingImage}
                            className="rounded-full bg-(--color-accent-soft) px-5 py-3 text-sm font-semibold text-(--color-background) disabled:opacity-60"
                        >
                            {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Meal"}
                        </button>
                    </div>
                </form>

                {/* ── Inventory list ── */}
                <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
                    <h2 className="text-xl font-semibold">
                        Inventory{" "}
                        <span className="text-sm font-normal text-(--color-text-muted)">
                            ({mealItems.length})
                        </span>
                    </h2>

                    {loadingMealItems && (
                        <p className="mt-4 text-sm text-(--color-text-muted)">Loading meals...</p>
                    )}
                    {mealItemsError && (
                        <p className="mt-4 text-sm text-red-300">{mealItemsError}</p>
                    )}

                    <div className="mt-6 grid gap-4">
                        {mealItems.map((meal) => (
                            <article
                                key={meal.id}
                                className={[
                                    "rounded-2xl border bg-(--color-background) transition-colors",
                                    editingMealId === meal.id
                                        ? "border-(--color-accent-soft)"
                                        : "border-(--color-border)",
                                ].join(" ")}
                            >
                                <div className="flex gap-3 p-4">
                                    {meal.imageUrl && (
                                        <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-(--color-surface-muted)">
                                            <img
                                                src={meal.imageUrl}
                                                alt={meal.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-sm leading-tight">
                                                {meal.name}
                                            </h3>

                                            {deleteConfirmId !== meal.id && (
                                                <div className="flex shrink-0 gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(meal)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-text-muted) transition hover:border-(--color-accent-soft) hover:text-(--color-accent-soft)"
                                                    >
                                                        <Pencil size={13} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteConfirmId(meal.id)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-text-muted) transition hover:border-red-400/60 hover:text-red-400"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-(--color-text-muted) line-clamp-2">
                                            {meal.description}
                                        </p>

                                        {meal.dietaryTags.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {meal.dietaryTags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-(--color-surface-muted) px-2 py-0.5 text-[10px] text-(--color-text-muted)"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-2 flex gap-3 text-[11px] text-(--color-text-muted)">
                                            {meal.calories && <span>{meal.calories} cal</span>}
                                            {meal.protein && <span className="text-(--color-accent-soft) font-semibold">{meal.protein}g P</span>}
                                            {meal.carbs && <span>{meal.carbs}g C</span>}
                                            {meal.fat && <span>{meal.fat}g F</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Delete confirmation */}
                                {deleteConfirmId === meal.id && (
                                    <div className="flex items-center justify-between gap-3 border-t border-(--color-border) px-4 py-3">
                                        <p className="text-sm text-(--color-text-muted)">
                                            Delete <span className="font-semibold text-(--color-text)">{meal.name}</span>?
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setDeleteConfirmId(null)}
                                                disabled={deleting}
                                                className="rounded-full border border-(--color-border) px-3 py-1.5 text-xs text-(--color-text-muted) transition hover:bg-(--color-surface-muted)"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(meal.id)}
                                                disabled={deleting}
                                                className="rounded-full bg-red-500/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
                                            >
                                                {deleting ? "Deleting..." : "Yes, Delete"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}

                        {!loadingMealItems && mealItems.length === 0 && (
                            <p className="rounded-2xl border border-(--color-border) px-4 py-8 text-center text-sm text-(--color-text-muted)">
                                No meals yet. Add your first one.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
