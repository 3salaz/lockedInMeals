import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import SectionFrame from "@/components/layout/SectionFrame";
import type { MealItem } from "@/features/meals/types/meal.types";
import type { WeeklyMenu } from "@/features/weeklyMenu/types/weeklyMenu.types";

type WeeklyMenuSectionProps = {
  snap?: boolean;
  publishedWeeklyMenu: WeeklyMenu | null;
  loadingPublishedWeeklyMenu: boolean;
  publishedWeeklyMenuError: string;
  mealItems: MealItem[];
  loadingMealItems: boolean;
};

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getDeadlineDate(weekStartDate: string, orderDeadline: string): Date | null {
  const lower = orderDeadline.toLowerCase();
  const dayIndex = DAY_NAMES.findIndex((d) => lower.includes(d));
  if (dayIndex === -1) return null;

  const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if (!timeMatch) return null;

  let hour = parseInt(timeMatch[1]);
  const min = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
  if (timeMatch[3] === "pm" && hour !== 12) hour += 12;
  if (timeMatch[3] === "am" && hour === 12) hour = 0;

  // weekStartDate is always Monday (dayIndex 1)
  const monday = new Date(`${weekStartDate}T00:00:00`);
  let offset = dayIndex - 1; // 1 = Monday
  if (offset < 0) offset += 7;

  const deadline = new Date(monday);
  deadline.setDate(monday.getDate() + offset);
  deadline.setHours(hour, min, 0, 0);
  return deadline;
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; expired: boolean };

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    expired: false,
  };
}

function useCountdown(target: Date | null): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    () => (target ? calcTimeLeft(target) : null),
  );

  useEffect(() => {
    if (!target) return;
    setTimeLeft(calcTimeLeft(target));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function formatWeekRange(weekStartDate: string) {
  const start = new Date(`${weekStartDate}T00:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const fmt = (d: Date) => {
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };

  return `${fmt(start)} – ${fmt(end)}, ${start.getFullYear()}`;
}

export default function WeeklyMenuSection({
  snap = true,
  publishedWeeklyMenu,
  loadingPublishedWeeklyMenu,
  publishedWeeklyMenuError,
  mealItems,
  loadingMealItems,
}: WeeklyMenuSectionProps) {
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const deadline = publishedWeeklyMenu
    ? getDeadlineDate(publishedWeeklyMenu.weekStartDate, publishedWeeklyMenu.orderDeadline)
    : null;
  const timeLeft = useCountdown(deadline);

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
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="relative h-14 w-14 mx-auto">
            <div className="absolute inset-0 rounded-full border-[3px] border-(--color-border)" />
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-(--color-accent-soft)" />
            <div
              className="absolute inset-3 rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-soft) 18%, transparent)" }}
            />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--color-accent-soft)">
              Weekly Menu
            </p>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              Loading this week's meals...
            </p>
          </div>
        </div>
      </SectionFrame>
    );
  }

  if (publishedWeeklyMenuError) {
    return (
      <SectionFrame id="weekly-menu" snap={snap} maxWidth="6xl">
        <p className="text-red-300 text-sm">{publishedWeeklyMenuError}</p>
      </SectionFrame>
    );
  }

  if (!publishedWeeklyMenu) {
    return (
      <SectionFrame id="weekly-menu" snap={snap} maxWidth="6xl">
        <p className="text-(--color-text-muted) text-sm">No published weekly menu found.</p>
      </SectionFrame>
    );
  }

  return (
    <>
      <SectionFrame
        id="weekly-menu"
        snap={snap}
        maxWidth="6xl"
        contentClassName="flex-col items-stretch pt-8 sm:pt-0 pb-3 overflow-hidden gap-0"
        background={
          <>
            <div
              className="absolute -right-20 top-20 h-64 w-64 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
            />
            <div
              className="absolute bottom-10 -left-20 h-64 w-64 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-soft) 12%, transparent)" }}
            />
          </>
        }
      >
        <div className="flex flex-col h-full overflow-hidden gap-2.5 sm:gap-3">

          {/* ── Header ── */}
          <div className="flex items-start justify-between shrink-0">
            <div>
              <h2 className="inline rounded-md bg-(--color-accent-soft) px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.3em] text-(--color-background)">
                Weekly Menu
              </h2>
              <p className="mt-1 text-sm text-(--color-text-muted)">
                {formatWeekRange(publishedWeeklyMenu.weekStartDate)}
              </p>
            </div>

            <div className="text-right bg-(--color-surface) p-2 rounded-md">
              <p className="text-3xl font-bold leading-none text-(--color-accent-soft)">
                ${publishedWeeklyMenu.pricePerMeal}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-(--color-text-muted)">
                per meal
              </p>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <StatPill label="Order by" value={publishedWeeklyMenu.orderDeadline} accent />
            <StatPill value={publishedWeeklyMenu.pickupDeliveryText} />
            <button
              type="button"
              onClick={() => setInfoOpen((v) => !v)}
              className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[11px] text-(--color-text-muted) transition hover:bg-(--color-surface-muted)"
            >
              {infoOpen ? "Hide Info" : "More Info"}
            </button>
          </div>

          {/* ── Info drawer ── */}
          <AnimatePresence>
            {infoOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden shrink-0"
              >
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 text-xs">
                  <InfoItem label="Delivery Areas" value={publishedWeeklyMenu.deliveryAreas.join(" · ")} />
                  <InfoItem label="Pickup" value={publishedWeeklyMenu.pickupAreas.join(" · ")} />
                  {publishedWeeklyMenu.addons.length > 0 && (
                    <div className="col-span-2">
                      <InfoItem label="Add-ons" value={publishedWeeklyMenu.addons.join(" · ")} />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Featured meal ── */}
          {/* {featuredMeal && (
            <motion.button
              type="button"
              onClick={() => setSelectedMealId(featuredMeal.id)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full shrink-0 text-left rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 flex gap-3 hover:border-(--color-accent-soft)/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-(--color-accent-soft)">
                  Featured Item
                </p>
                <h3 className="mt-0.5 font-bold text-sm leading-snug text-(--color-text) line-clamp-1">
                  {featuredMeal.name}
                </h3>
                <p className="mt-1 text-xs leading-4 text-(--color-text-muted) line-clamp-2">
                  {featuredMeal.description}
                </p>
                <MacroLine meal={featuredMeal} />
              </div>

              <div className="shrink-0 w-24 rounded-xl overflow-hidden bg-(--color-surface-muted) self-stretch min-h-[90px]">
                {featuredMeal.imageUrl ? (
                  <img
                    src={featuredMeal.imageUrl}
                    alt={featuredMeal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            </motion.button>
          )} */}

          {/* ── Meal strip header ── */}
          <div className="flex items-center justify-between shrink-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-(--color-text-muted)">
              This week · {menuMeals.length} meals
            </p>
            <p className="text-[11px] text-(--color-text-muted) opacity-60">swipe →</p>
          </div>

          {/* ── Horizontal meal strip ── */}
          <div className="flex-1 min-h-0 -mx-5 sm:-mx-8 overflow-x-auto">
            <div className="flex h-full gap-2.5 pl-5 sm:pl-8 pb-1">
              {menuMeals.map((meal) => {
                const isSelected = meal.id === selectedMealId;
                return (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() => setSelectedMealId(meal.id)}
                    className={[
                      "w-80 sm:w-44 shrink-0 h-full flex flex-col rounded-2xl border bg-(--color-surface) overflow-hidden text-left transition-colors",
                      isSelected
                        ? "border-(--color-accent-soft) shadow-[0_0_0_1px_var(--color-accent-soft)]"
                        : "border-(--color-border) hover:border-(--color-accent-soft)/50",
                    ].join(" ")}
                  >
                    <div className="relative flex-1 min-h-0 bg-(--color-surface-muted)">
                      {meal.imageUrl ? (
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                      {meal.id === publishedWeeklyMenu.featuredMealId && (
                        <span className="absolute top-1.5 left-1.5 rounded-full bg-(--color-accent-soft) px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-(--color-background)">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="p-2 shrink-0">
                      <h4 className="text-xs font-semibold text-(--color-text) line-clamp-2 leading-tight">
                        {meal.name}
                      </h4>
                      {meal.description && (
                        <p className="mt-1 text-[11px] leading-4 text-(--color-text-muted) line-clamp-2">
                          {meal.description}
                        </p>
                      )}
                      <MacroLine meal={meal} />
                    </div>
                  </button>
                );
              })}
              {/* trailing spacer so last card right edge is never clipped */}
              <div className="shrink-0 w-5 sm:w-8" aria-hidden />
            </div>
          </div>

          {/* ── Countdown + Order Now ── */}
          <div className="shrink-0 flex flex-col gap-2 pt-1">

            {timeLeft && !timeLeft.expired && (
              <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
                  Order deadline ·{" "}
                  <span className="font-semibold text-(--color-accent-soft)">
                    {publishedWeeklyMenu.orderDeadline}
                  </span>
                </p>
                <div className="mt-2 flex gap-2">
                  {[
                    { value: timeLeft.days, unit: "Days" },
                    { value: timeLeft.hours, unit: "Hours" },
                    { value: timeLeft.minutes, unit: "Min" },
                    { value: timeLeft.seconds, unit: "Sec" },
                  ].map(({ value, unit }) => (
                    <div key={unit} className="flex-1 text-center">
                      <div className="rounded-xl bg-(--color-background) py-1.5">
                        <p className="text-base font-bold tabular-nums leading-none text-(--color-text)">
                          {String(value).padStart(2, "0")}
                        </p>
                      </div>
                      <p className="mt-1 text-[9px] uppercase tracking-widest text-(--color-text-muted)">
                        {unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {timeLeft?.expired && (
              <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) px-3 py-2.5 text-center">
                <p className="text-xs text-(--color-text-muted)">
                  Ordering closed for this week
                </p>
              </div>
            )}

            <button
              type="button"
              disabled
              className="w-full rounded-full bg-(--color-accent-soft) py-3 text-sm font-bold text-(--color-background) opacity-50 cursor-not-allowed"
            >
              Order Now — Coming Soon
            </button>
          </div>
        </div>
      </SectionFrame>

      {/* ── Meal detail modal ── */}
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
              className="fixed inset-0 z-70 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 top-1/2 z-80 mx-auto -translate-y-1/2 max-h-[calc(100svh-3rem)] max-w-lg overflow-y-auto rounded-4xl border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-2xl"
            >
              {selectedMeal.imageUrl && (
                <img
                  src={selectedMeal.imageUrl}
                  alt={selectedMeal.name}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-(--color-accent-soft)">
                      Meal Details
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{selectedMeal.name}</h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setSelectedMealId(null)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-muted)"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-sm leading-6 text-(--color-text-muted)">
                  {selectedMeal.description}
                </p>

                <MealTags tags={selectedMeal.dietaryTags} />

                <div className="mt-4 grid grid-cols-4 gap-2">
                  <MacroCard label="Cal" value={selectedMeal.calories} />
                  <MacroCard label="Protein" value={selectedMeal.protein} suffix="g" />
                  <MacroCard label="Carbs" value={selectedMeal.carbs} suffix="g" />
                  <MacroCard label="Fat" value={selectedMeal.fat} suffix="g" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function StatPill({
  label,
  value,
  accent = false,
}: {
  label?: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[11px]">
      {label && <span className="text-(--color-text-muted)">{label}:</span>}
      <span
        className={
          accent
            ? "font-semibold text-(--color-accent-soft)"
            : "text-(--color-text)"
        }
      >
        {value}
      </span>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-(--color-accent-soft) mb-0.5">
        {label}
      </p>
      <p className="text-xs text-(--color-text-muted) leading-4">{value || "Coming soon"}</p>
    </div>
  );
}

function MacroLine({ meal }: { meal: MealItem }) {
  const parts = [
    meal.calories ? `${meal.calories} Cal` : null,
    meal.protein ? `${meal.protein}g P` : null,
    meal.carbs ? `${meal.carbs}g C` : null,
    meal.fat ? `${meal.fat}g F` : null,
  ].filter(Boolean) as string[];

  if (!parts.length) return null;

  return (
    <p className="mt-1.5 text-xs text-(--color-text-muted)">
      {parts.map((part, i) => (
        <span key={part}>
          {i > 0 && <span className="mx-1 opacity-30">·</span>}
          <span className={part.includes("P") ? "text-(--color-accent-soft) font-semibold" : ""}>
            {part}
          </span>
        </span>
      ))}
    </p>
  );
}

function MealTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.slice(0, 5).map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-muted)"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function MacroCard({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value?: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl bg-(--color-background) p-2.5 text-center">
      <p className="text-[10px] text-(--color-text-muted)">{label}</p>
      <p className="mt-1 font-bold text-sm text-(--color-text)">
        {value ? `${value}${suffix}` : "—"}
      </p>
    </div>
  );
}
