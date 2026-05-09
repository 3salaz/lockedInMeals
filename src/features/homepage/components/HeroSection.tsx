import { motion } from "framer-motion";

import SectionFrame from "@/components/layout/SectionFrame";
import type { HomepageHeroContent } from "@/features/homepage/types/homepageContent.types";

type HeroPreviewMode = "mobile" | "tablet" | "desktop";

type HeroSectionProps = {
    hero: HomepageHeroContent;
    compact?: boolean;
    previewMode?: HeroPreviewMode;
    snap?: boolean;
};

export default function HeroSection({
    hero,
    compact = false,
    previewMode = "desktop",
    snap = true,
}: HeroSectionProps) {
    const isMobilePreview = compact && previewMode === "mobile";
    const isTabletPreview = compact && previewMode === "tablet";
    const isDesktopPreview = !compact || previewMode === "desktop";

    const contentGridClass = isDesktopPreview
        ? "lg:grid-cols-[1.15fr_0.85fr]"
        : "grid-cols-1";

    const headingClass = isMobilePreview
        ? "text-4xl"
        : isTabletPreview
            ? "text-5xl"
            : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";

    const bodyClass = isMobilePreview
        ? "text-sm leading-7"
        : isTabletPreview
            ? "text-base leading-8"
            : "text-sm leading-7 sm:text-base sm:leading-8";

    const showHighlights = isDesktopPreview;
    const heroHighlights = hero.highlights ?? [];

    return (
        <SectionFrame
            id="hero"
            snap={compact ? false : snap}
            fullHeight
            withDivider={false}
            variant="grid"
            className={compact ? "h-180" : ""}
            contentClassName={[
                "gap-10",
                compact ? "py-16" : "pb-10 pt-32 sm:px-8 lg:px-10 xl:px-0",
                contentGridClass,
            ].join(" ")}
            background={
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${hero.heroImageUrl})`,
                        }}
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 25%, transparent), color-mix(in srgb, var(--color-background) 65%, transparent), color-mix(in srgb, var(--color-background) 92%, transparent))",
                        }}
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at top, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 34%)",
                        }}
                    />

                    <div
                        className="absolute -left-20 top-28 h-52 w-52 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent) 14%, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-12 -right-12 h-56 w-56 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent-soft) 14%, transparent)",
                        }}
                    />
                </>
            }
        >
            <div className="max-w-4xl">
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-[11px] font-medium uppercase tracking-[0.34em] text-(--color-accent-soft)"
                >
                    {hero.eyebrow}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.08 }}
                    className={[
                        "max-w-4xl leading-[0.98] font-semibold text-(--color-text)",
                        headingClass,
                    ].join(" ")}
                >
                    {hero.heading}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.16 }}
                    className={[
                        "mt-6 max-w-2xl text-(--color-text-muted)",
                        bodyClass,
                    ].join(" ")}
                >
                    {hero.body}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.24 }}
                    className={[
                        "mt-8 flex gap-3",
                        isMobilePreview ? "flex-col" : "flex-col sm:flex-row",
                    ].join(" ")}
                >
                    <a
                        href={hero.primaryCtaHref}
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-accent-soft) px-6 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02]"
                    >
                        {hero.primaryCtaLabel}
                    </a>

                    <a
                        href={hero.secondaryCtaHref}
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) px-6 py-3 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-muted)"
                    >
                        {hero.secondaryCtaLabel}
                    </a>
                </motion.div>
            </div>

            {showHighlights && heroHighlights.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.32 }}
                    className="hidden max-w-md grid-cols-2 gap-3 justify-self-end sm:grid"
                >
                    {heroHighlights.map((item) => (
                        <div
                            key={item}
                            className="flex aspect-square items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 py-4 text-center text-sm text-(--color-text-muted) backdrop-blur-sm"
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            )}
        </SectionFrame>
    );
}