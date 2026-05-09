import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import SectionFrame from "@/components/layout/SectionFrame";
import { useMealItems } from "@/features/meals/hooks/useMealItems";
import type { MealItem } from "@/features/meals/types/meal.types";
import { usePublishedWeeklyMenu } from "@/features/weeklyMenu/hooks/usePublishedWeeklyMenu";

type WeeklyMenuSectionProps = {
  snap?: boolean;
};

export default function WeeklyMenuSection({ snap = true }: WeeklyMenuSectionProps) {
  const [viewMode, setViewMode] = useState<"featured" | "full">("featured");
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function formatDisplayDate(date: Date) {
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}${getOrdinalSuffix(day)} ${year}`;
  }

  function formatWeekRange(weekStartDate: string) {
    const start = new Date(`${weekStartDate}T00:00:00`);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;
  }

  const {
    publishedWeeklyMenu,
    loadingPublishedWeeklyMenu,
    publishedWeeklyMenuError,
  } = usePublishedWeeklyMenu();

  const { mealItems, loadingMealItems } = useMealItems();

  const loading = loadingPublishedWeeklyMenu || loadingMealItems;

  const featuredMeal = mealItems.find(
    (meal) => meal.id === publishedWeeklyMenu?.featuredMealId,
  );

  const selectedMeal = mealItems.find((meal) => meal.id === selectedMealId);

  const menuMeals: MealItem[] =
  publishedWeeklyMenu?.mealIds
    .map((mealId) => mealItems.find((meal) => meal.id === mealId))
    .filter((meal): meal is MealItem => Boolean(meal)) ?? [];

  if (loading) {
    return (
      <SectionFrame id="weekly-menu" snap={snap} maxWidth="6xl">
        <p className="text-(--color-text-muted)">Loading weekly menu...</p>
      </SectionFrame>
    );
  }

  if (publishedWeeklyMenuError) {
    return (
      <SectionFrame id="weekly-menu" snap={snap} maxWidth="6xl">
        <p className="text-red-300">{publishedWeeklyMenuError}</p>
      </SectionFrame>
    );
  }

  if (!publishedWeeklyMenu) {
    return (
      <SectionFrame id="weekly-menu" snap={snap} maxWidth="6xl">
        <p className="text-(--color-text-muted)">No published weekly menu found.</p>
      </SectionFrame>
    );
  }

  return (
    <>
      <SectionFrame
        id="weekly-menu"
        snap={snap}
        maxWidth="6xl"
        contentClassName="items-start pt-20 sm:pt-24"
        background={
          <>
            <div
              className="absolute -right-20 top-24 h-72 w-72 rounded-full blur-3xl"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 14%, transparent)",
              }}
            />

            <div
              className="absolute bottom-16 -left-20 h-72 w-72 rounded-full blur-3xl"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent-soft) 16%, transparent)",
              }}
            />
          </>
        }
      >
        <div className="w-full">
          <div className="flex justify-between">
            <motion.div
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-5"
            >
              <h2 className="inline rounded-md bg-(--color-accent-soft) px-2 text-xl font-medium uppercase tracking-[0.32em] text-(--color-background) drop-shadow-xl">
                Weekly Menu
              </h2>

              <p className="mt-4 text-sm leading-7 text-(--color-text-muted)">
                Fresh meal prep options for the week of:
                <span className="font-medium text-(--color-text) flex">
                  {formatWeekRange(publishedWeeklyMenu.weekStartDate)}
                </span>
              </p>

              <p className="text-sm text-(--color-text-muted)">
                Order by{" "}
                <span className="font-medium text-(--color-accent-soft)">
                  {publishedWeeklyMenu.orderDeadline}
                </span>
                .
              </p>
            </motion.div>

            <div
              className={[
                "relative z-30 mb-5 border border-(--color-border) bg-(--color-surface) p-4 transition-all rounded-3xl",
                // infoOpen
                //   ? "rounded-t-3xl rounded-b-none"
                //   : "rounded-3xl",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--color-text-muted)">
                    Price
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-(--color-accent-soft)">
                    ${publishedWeeklyMenu.pricePerMeal}
                  </p>

                  <p className="text-sm text-(--color-text-muted)">per meal</p>

                </div>
              </div>



            </div>


          </div>
          <motion.div className="pb-4">


            <AnimatePresence>
              {infoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full z-50 grid gap-2 rounded-b-3xl border border-(--color-border) bg-(--color-surface) p-4 shadow-2xl"
                >
                  <InfoCard
                    title="Pickup / Delivery"
                    value={publishedWeeklyMenu.pickupDeliveryText}
                  />

                  <InfoCard
                    title="Delivery Areas"
                    value={publishedWeeklyMenu.deliveryAreas.join(", ")}
                  />

                  <InfoCard
                    title="Add-ons"
                    value={publishedWeeklyMenu.addons.join(", ")}
                  />
                </motion.div>
              )}
            </AnimatePresence>


          </motion.div>


          <AnimatePresence mode="wait">
            {viewMode === "featured" && featuredMeal && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <FeaturedMealCard
                  meal={featuredMeal}
                  onClick={() => setSelectedMealId(featuredMeal.id)}
                />
              </motion.div>
            )}

            {viewMode === "full" && (
              <motion.div
                key="full"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <FullMenuCarousel
                  meals={menuMeals}
                  onMealClick={(mealId) => setSelectedMealId(mealId)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex justify-start">
            <button
              type="button"
              onClick={() =>
                setViewMode((current) =>
                  current === "featured" ? "full" : "featured",
                )
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-accent-soft) px-6 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02]"
            >
              {viewMode === "featured" ? "View Full Menu" : "View Featured Meal"}
            </button>
                        <button
              type="button"
              onClick={() => setInfoOpen((current) => !current)}
              className="rounded-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-xs font-semibold text-(--color-text) transition hover:bg-(--color-surface-muted)"
            >
              {infoOpen ? "Hide Info" : "Menu Info"}
            </button>
          </div>
        </div>
      </SectionFrame>

      <AnimatePresence>
        {selectedMeal && (
          <>
            <motion.button
              type="button"
              aria-label="Close meal details"
              onClick={() => setSelectedMealId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 top-6 z-[80] mx-auto max-h-[calc(100svh-3rem)] max-w-lg overflow-y-auto rounded-4xl border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-2xl"
            >
              {selectedMeal.imageUrl && (
                <img
                  src={selectedMeal.imageUrl}
                  alt={selectedMeal.name}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-(--color-accent)">
                      Meal Details
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">
                      {selectedMeal.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Close meal details"
                    onClick={() => setSelectedMealId(null)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-muted)"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-sm leading-7 text-(--color-text-muted)">
                  {selectedMeal.description}
                </p>

                <MealTags tags={selectedMeal.dietaryTags} />

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Macro label="Calories" value={selectedMeal.calories} />
                  <Macro label="Protein" value={selectedMeal.protein} suffix="g" />
                  <Macro label="Carbs" value={selectedMeal.carbs} suffix="g" />
                  <Macro label="Fat" value={selectedMeal.fat} suffix="g" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

type MealCardProps = {
  meal: MealItem;
  onClick: () => void;
};

function FeaturedMealCard({ meal, onClick }: MealCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ y: 10 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full overflow-hidden rounded-4xl border border-(--color-border) bg-(--color-surface) text-left shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
    >
      <div className="relative">
        {meal.imageUrl ? (
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="h-56 w-full bg-(--color-surface-muted)" />
        )}

        <div className="absolute left-4 top-4 rounded-full bg-(--color-accent-soft) px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-background)">
          Featured
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-semibold text-(--color-text)">
          {meal.name}
        </h3>

        <p className="mt-3 line-clamp-4 text-sm leading-6 text-(--color-text-muted)">
          {meal.description}
        </p>

        <MealTags tags={meal.dietaryTags} />
      </div>
    </motion.button>
  );
}

type FullMenuCarouselProps = {
  meals: MealItem[];
  onMealClick: (mealId: string) => void;
};

function FullMenuCarousel({ meals, onMealClick }: FullMenuCarouselProps) {
  return (
    <div className="rounded-4xl border border-(--color-border) bg-(--color-surface) p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-(--color-accent-soft)">
            Full Menu
          </p>

          <h3 className="mt-1 text-xl font-semibold text-(--color-text)">
            {meals.length} meals available
          </h3>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2">
        <div className="flex snap-x snap-mandatory gap-4">
          {meals.map((meal) => (
            <button
              key={meal.id}
              type="button"
              onClick={() => onMealClick(meal.id)}
              className="min-w-[78%] snap-center rounded-3xl border border-(--color-border) bg-(--color-background) p-3 text-left sm:min-w-[45%]"
            >
              {meal.imageUrl ? (
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="h-36 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="h-36 w-full rounded-2xl bg-(--color-surface-muted)" />
              )}

              <h4 className="mt-4 text-base font-semibold text-(--color-text)">
                {meal.name}
              </h4>

              <p className="mt-2 line-clamp-3 text-xs leading-5 text-(--color-text-muted)">
                {meal.description}
              </p>

              <MealTags tags={meal.dietaryTags} compact />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealTags({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  if (!tags.length) return null;

  return (
    <div
      className={
        compact ? "mt-2 flex flex-wrap gap-1.5" : "mt-4 flex flex-wrap gap-2"
      }
    >
      {tags.slice(0, compact ? 3 : 5).map((tag) => (
        <span
          key={tag}
          className={[
            "rounded-full bg-(--color-surface-muted) text-(--color-text-muted)",
            compact ? "px-2 py-1 text-[10px]" : "px-3 py-1 text-xs",
          ].join(" ")}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function Macro({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value?: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl bg-(--color-background) p-3">
      <p className="text-xs text-(--color-text-muted)">{label}</p>

      <p className="mt-1 font-semibold text-(--color-text)">
        {value ? `${value}${suffix}` : "—"}
      </p>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-background) p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-(--color-accent-soft)">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
        {value || "Coming soon"}
      </p>
    </div>
  );
}