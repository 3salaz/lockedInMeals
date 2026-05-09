import { motion } from "framer-motion";

import SectionFrame from "@/components/layout/SectionFrame";
import { useMealItems } from "@/features/meals/hooks/useMealItems";
import { usePublishedWeeklyMenu } from "@/features/weeklyMenu/hooks/usePublishedWeeklyMenu";

type WeeklyMenuSectionProps = {
  snap?: boolean;
};

export default function WeeklyMenuSection({ snap = true }: WeeklyMenuSectionProps) {
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

  const menuMeals =
    publishedWeeklyMenu?.mealIds
      .map((mealId) => mealItems.find((meal) => meal.id === mealId))
      .filter(Boolean) ?? [];

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
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-(--color-accent) sm:text-xs">
              Weekly Menu
            </p>

            <h2 className="text-3xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
              This week’s meals are locked in.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-(--color-text-muted) sm:text-base sm:leading-8">
              Fresh meal prep options for the week of{" "}
              <span className="font-medium text-(--color-text)">
                {publishedWeeklyMenu.weekStartDate}
              </span>
              . Order by{" "}
              <span className="font-medium text-(--color-accent)">
                {publishedWeeklyMenu.orderDeadline}
              </span>
              .
            </p>
          </div>

          <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) px-5 py-4 text-left lg:min-w-56">
            <p className="text-xs uppercase tracking-[0.24em] text-(--color-text-muted)">
              Price
            </p>

            <p className="mt-1 text-3xl font-semibold text-(--color-accent)">
              ${publishedWeeklyMenu.pricePerMeal}
            </p>

            <p className="text-sm text-(--color-text-muted)">per meal</p>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {featuredMeal && (
            <motion.article
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden rounded-4xl border border-(--color-border) bg-(--color-surface) shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
            >
              <div className="relative">
                {featuredMeal.imageUrl ? (
                  <img
                    src={featuredMeal.imageUrl}
                    alt={featuredMeal.name}
                    className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]"
                  />
                ) : (
                  <div className="h-64 w-full bg-(--color-surface-muted) sm:h-80 lg:h-[28rem]" />
                )}

                <div className="absolute left-4 top-4 rounded-full bg-(--color-accent) px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--color-background)">
                  Featured
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent"
                  style={
                    {
                      "--tw-gradient-from":
                        "color-mix(in srgb, var(--color-background) 80%, transparent)",
                    } as React.CSSProperties
                  }
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-2xl font-semibold text-(--color-text) sm:text-3xl">
                  {featuredMeal.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-(--color-text-muted) sm:text-base sm:leading-7">
                  {featuredMeal.description}
                </p>

                <MealTags tags={featuredMeal.dietaryTags} />
              </div>
            </motion.article>
          )}

          <div className="grid gap-4">
            <div className="rounded-4xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--color-accent)">
                    Menu Items
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-(--color-text)">
                    Available this week
                  </h3>
                </div>

                <p className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-muted)">
                  {menuMeals.length} items
                </p>
              </div>

              <div className="grid gap-3">
                {menuMeals.map((meal, index) => {
                  if (!meal) return null;

                  return (
                    <motion.article
                      key={meal.id}
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: "easeOut",
                      }}
                      className="rounded-3xl border border-(--color-border) bg-(--color-background) p-3 sm:p-4"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        {meal.imageUrl ? (
                          <img
                            src={meal.imageUrl}
                            alt={meal.name}
                            className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24"
                          />
                        ) : (
                          <div className="h-20 w-20 shrink-0 rounded-2xl bg-(--color-surface-muted) sm:h-24 sm:w-24" />
                        )}

                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-(--color-text) sm:text-base">
                            {meal.name}
                          </h4>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-(--color-text-muted) sm:text-sm sm:leading-6">
                            {meal.description}
                          </p>

                          <MealTags tags={meal.dietaryTags} compact />
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
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
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

type MealTagsProps = {
  tags: string[];
  compact?: boolean;
};

function MealTags({ tags, compact = false }: MealTagsProps) {
  if (!tags.length) return null;

  return (
    <div className={compact ? "mt-2 flex flex-wrap gap-1.5" : "mt-4 flex flex-wrap gap-2"}>
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

type InfoCardProps = {
  title: string;
  value: string;
};

function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-(--color-accent)">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
        {value || "Coming soon"}
      </p>
    </div>
  );
}