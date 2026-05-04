import { motion } from "framer-motion";
import { Mail, Sparkles, Ticket, UsersRound } from "lucide-react";

import SnapSection from "@/components/layout/SnapSection";

const crewItems = [
    {
        icon: Mail,
        title: "Early Updates",
        text: "Follow the progress as The Wine Chapel develops from idea to destination.",
    },
    {
        icon: Ticket,
        title: "Future Access",
        text: "Be first to hear about upcoming experiences, invitations, and launch moments.",
    },
    {
        icon: Sparkles,
        title: "Behind the Scenes",
        text: "Get a closer look at the property, the vision, and what is being built.",
    },
    {
        icon: UsersRound,
        title: "Community",
        text: "Join a growing circle of wine lovers, travelers, and early supporters.",
    },
];

export default function WineCrew() {
    return (
        <SnapSection
            id="wine-crew"
            maxWidth="6xl"
            contentClassName="pt-16 sm:pt-24"
            background={
                <>
                    <div
                        className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent-soft) 22%, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-10 -left-16 h-56 w-56 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent) 14%, transparent)",
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
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-(--color-accent) sm:mb-4 sm:text-xs">
                        Wine Crew
                    </p>

                    <h2 className="text-2xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
                        Join the early community behind The Wine Chapel
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) sm:mt-4 sm:text-base sm:leading-8">
                        Wine Crew is for early supporters, future guests, wine lovers, and
                        people curious about what this space can become.
                    </p>
                </motion.div>

                <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:mt-8 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
                    {crewItems.map((item, index) => {
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
                                className="min-w-[78%] snap-center rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 text-center backdrop-blur-sm sm:min-w-[42%] sm:p-5 lg:min-w-0"
                            >
                                <div
                                    className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-(--color-accent) sm:mb-4 sm:h-11 sm:w-11"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                                        borderColor:
                                            "color-mix(in srgb, var(--color-accent) 28%, transparent)",
                                    }}
                                >
                                    <Icon size={19} />
                                </div>

                                <h3 className="text-sm font-semibold text-(--color-text) sm:text-base">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-(--color-text-muted) sm:text-sm sm:leading-6">
                                    {item.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-4 flex justify-center sm:mt-8">
                    <a
                        href="#contact"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02] sm:min-h-12"
                    >
                        Join the Wine Crew
                    </a>
                </div>
            </div>
        </SnapSection>
    );
}