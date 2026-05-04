import { motion } from "framer-motion";

const audienceItems = [
    {
        title: "For busy people",
        text: "Thoughtfully curated for people who want an unforgettable journey without the headache of planning every piece themselves.",
    },
    {
        title: "For global explorers",
        text: "Built for travelers drawn to culture, discovery, and the feeling of stepping into something rare and meaningful.",
    },
    {
        title: "For wine lovers",
        text: "Guided by an experienced sommelier with a focus on taste, atmosphere, storytelling, and personal connection.",
    },
];

export default function Audience() {
    return (
        <section
            id="audience"
            className="relative isolate min-h-svh snap-start snap-always overflow-hidden bg-(--color-background) text-(--color-text)"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[var(--color-border)] to-transparent" />

            <div
                className="absolute right-16 top-24 h-56 w-56 rounded-full blur-3xl"
                style={{
                    backgroundColor:
                        "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                }}
            />

            <div
                className="absolute bottom-16 left-16 h-56 w-56 rounded-full blur-3xl"
                style={{
                    backgroundColor:
                        "color-mix(in srgb, var(--color-accent-soft) 14%, transparent)",
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl items-center px-5 pb-14 pt-28 sm:px-8 sm:pb-16 md:pb-20">
                <div className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-(--color-accent) sm:text-xs">
                            Who It’s For
                        </p>

                        <div className="mb-4 max-w-2xl">
                            <h2 className="text-3xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
                                Designed for people who want more than a trip
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-(--color-text-muted) sm:text-base sm:leading-8">
                                This is for people who value taste, time, and thoughtful
                                experiences — not cookie-cutter tourism with a wine glass
                                slapped on top.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
                        {audienceItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 backdrop-blur-sm sm:p-6"
                            >
                                <h3 className="text-lg font-semibold text-(--color-text) sm:text-xl">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-(--color-text-muted) sm:leading-7">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}