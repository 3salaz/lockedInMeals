import { motion } from "framer-motion";
import {
    CalendarDays,
    Dumbbell,
    Leaf,
    Mail,
    MapPinned,
    Music,
    Sparkles,
    Ticket,
    Truck,
    UsersRound,
    Utensils,
    Wine,
} from "lucide-react";

import SectionFrame from "@/components/layout/SectionFrame";
import type {
    FeatureCardsContent,
    FeatureCardsIconKey,
} from "@/features/homepage/types/homepageContent.types";

type FeatureCardsSectionProps = {
    content: FeatureCardsContent;
    snap?: boolean;
};


const iconMap = {
    map: MapPinned,
    music: Music,
    users: UsersRound,
    wine: Wine,
    utensils: Utensils,
    truck: Truck,
    dumbbell: Dumbbell,
    calendar: CalendarDays,
    leaf: Leaf,
    mail: Mail,
    sparkles: Sparkles,
    ticket: Ticket,
} satisfies Record<FeatureCardsIconKey, React.ComponentType<{ size?: number }>>;

export default function FeatureCardsSection({
    content,
    snap = true,
}: FeatureCardsSectionProps) {
    const isCentered = content.align === "center";
    const hasCta = Boolean(content.ctaLabel && content.ctaHref);

    const gridColumnsClass =
        content.columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

    return (
        <SectionFrame
            id={content.id}
            snap={snap}
            maxWidth="6xl"
            contentClassName="pt-20 sm:pt-24"
            background={
                <>
                    <div
                        className="absolute -right-16 top-24 h-56 w-56 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-16 -left-16 h-56 w-56 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent-soft) 14%, transparent)",
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
                    className={isCentered ? "mx-auto max-w-3xl text-center" : ""}
                >
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-(--color-accent) sm:text-xs">
                        {content.eyebrow}
                    </p>

                    <div className={isCentered ? "mb-8" : "mb-8 max-w-3xl"}>
                        <h2 className="text-3xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
                            {content.heading}
                        </h2>

                        <p
                            className={[
                                "mt-4 text-sm leading-7 text-(--color-text-muted) sm:text-base sm:leading-8",
                                isCentered ? "mx-auto max-w-2xl" : "max-w-2xl",
                            ].join(" ")}
                        >
                            {content.body}
                        </p>
                    </div>
                </motion.div>

                <div
                    className={[
                        "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:overflow-visible lg:pb-0",
                        gridColumnsClass,
                    ].join(" ")}
                >
                    {content.items.map((item, index) => {
                        const Icon = iconMap[item.icon] ?? Leaf;

                        return (
                            <motion.div
                                key={`${item.title}-${index}`}
                                initial={{ y: 10 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.04,
                                    ease: "easeOut",
                                }}
                                className={[
                                    "min-w-[82%] snap-center rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 backdrop-blur-sm sm:min-w-[45%] sm:p-6 lg:min-w-0",
                                    isCentered ? "text-center" : "",
                                ].join(" ")}
                            >
                                <div
                                    className={[
                                        "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-(--color-accent)",
                                        isCentered ? "mx-auto" : "",
                                    ].join(" ")}
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                                        borderColor:
                                            "color-mix(in srgb, var(--color-accent) 28%, transparent)",
                                    }}
                                >
                                    <Icon size={22} />
                                </div>

                                <h3 className="text-lg font-semibold text-(--color-text) sm:text-xl">
                                    {item.title}
                                </h3>

                                {item.text && (
                                    <p className="mt-3 text-sm leading-6 text-(--color-text-muted) sm:leading-7">
                                        {item.text}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {hasCta && (
                    <div className={isCentered ? "mt-8 flex justify-center" : "mt-8"}>
                        <a
                            href={content.ctaHref}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02]"
                        >
                            {content.ctaLabel}
                        </a>
                    </div>
                )}
            </div>
        </SectionFrame>
    );
}