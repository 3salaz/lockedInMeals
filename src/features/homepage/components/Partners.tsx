import { motion } from "framer-motion";
import {
    Building2,
    Handshake,
    Landmark,
    Palette,
    Utensils,
    Wine,
} from "lucide-react";

import SnapSection from "@/components/layout/SnapSection";

const partnerItems = [
    {
        icon: Wine,
        title: "Wine & Producers",
    },
    {
        icon: Landmark,
        title: "Tourism & Hospitality",
    },
    {
        icon: Utensils,
        title: "Food & Events",
    },
    {
        icon: Palette,
        title: "Creative & Brand Partners",
    },
    {
        icon: Building2,
        title: "Local Experience Partners",
    },
    {
        icon: Handshake,
        title: "Strategic Collaborators",
    },
];

export default function Partners() {
    return (
        <SnapSection
            id="partners"
            maxWidth="6xl"
            contentClassName="pt-16 sm:pt-24"
            background={
                <>
                    <div
                        className="absolute -right-16 top-24 h-72 w-72 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent) 14%, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-10 -left-16 h-72 w-72 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent-soft) 22%, transparent)",
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
                    className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
                >
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-(--color-accent) sm:mb-4 sm:text-xs">
                        Partners
                    </p>

                    <h2 className="text-2xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
                        Seeking partners to help bring the vision to life
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) sm:mt-4 sm:text-base sm:leading-8 lg:mx-0">
                        The Wine Chapel is in its early stage and is looking for aligned
                        partners across wine, hospitality, tourism, food, events, design,
                        and local experiences.
                    </p>
                </motion.div>

                <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:mt-8 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
                    {partnerItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ y: 10 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.04,
                                    ease: "easeOut",
                                }}
                                className="min-w-[70%] snap-center rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 backdrop-blur-sm sm:min-w-[38%] sm:p-5 lg:min-w-0"
                            >
                                <div
                                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-(--color-accent) sm:mb-4"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                                        borderColor:
                                            "color-mix(in srgb, var(--color-accent) 28%, transparent)",
                                    }}
                                >
                                    <Icon size={19} />
                                </div>

                                <h3 className="text-sm font-semibold leading-6 text-(--color-text) sm:text-base">
                                    {item.title}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-4 flex justify-center sm:mt-6 lg:justify-start">
                    <a
                        href="mailto:hello@thewinechapel.com?subject=Partnership Inquiry - The Wine Chapel"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02] sm:min-h-12"
                    >
                        Partner With Us
                    </a>
                </div>
            </div>
        </SnapSection>
    );
}