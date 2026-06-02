import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import SectionFrame from "@/components/layout/SectionFrame";
import type { FeatureStoryContent } from "@/features/homepage/types/homepageContent.types";

type FeaturedStorySectionProps = {
    content: FeatureStoryContent;
    snap?: boolean;
};

export default function FeaturedStorySection({
    content,
    snap = true,
}: FeaturedStorySectionProps) {
    const [open, setOpen] = useState(false);

    const hasModal =
        content.buttonLabel &&
        content.modalHeading &&
        content.modalBody &&
        content.modalBody.length > 0;

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <SectionFrame
                id={content.id}
                snap={snap}
                variant="grid"
                contentClassName="gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
                background={
                    <>
                        <div
                            className="absolute -left-16 top-20 h-72 w-72 rounded-full blur-3xl"
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                            }}
                        />

                        <div
                            className="absolute bottom-12 -right-16 h-72 w-72 rounded-full blur-3xl"
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--color-accent-soft) 14%, transparent)",
                            }}
                        />
                    </>
                }
            >
                <motion.div
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="order-2 lg:order-1"
                >
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-(--color-accent-soft) sm:text-xs">
                        {content.eyebrow}
                    </p>

                    <h2 className="max-w-2xl text-3xl leading-tight font-semibold text-(--color-text) sm:text-4xl lg:text-5xl">
                        {content.heading}
                    </h2>

                    <div className="relative mt-5 max-h-34 max-w-2xl overflow-hidden sm:max-h-48">
                        <div className="space-y-4 text-sm leading-7 text-(--color-text-muted) bg-(--color-background) sm:text-base sm:leading-8 p-2 rounded-lg">
                            {content.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t to-transparent"
                            style={
                                {
                                    "--tw-gradient-from": "var(--color-background)",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {hasModal && (
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) px-5 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-muted)"
                        >
                            {content.buttonLabel}
                        </button>
                    )}
                </motion.div>

                <motion.div
                    initial={{ y: 10, scale: 0.995 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="order-1 lg:order-2 grow"
                >
                    <div className="relative overflow-hidden rounded-4xl border border-(--color-border) bg-(--color-surface) shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
                        <img
                            src={content.imageUrl}
                            alt={content.imageAlt}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="h-55 w-full object-cover sm:h-90 lg:h-130"
                        />

                        <div
                            className="absolute inset-0 bg-linear-to-t via-transparent to-transparent"
                            style={
                                {
                                    "--tw-gradient-from":
                                        "color-mix(in srgb, var(--color-background) 70%, transparent)",
                                } as React.CSSProperties
                            }
                        />

                        {(content.imageBadgeEyebrow || content.imageBadgeBody) && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                <div
                                    className="max-w-md rounded-3xl border p-4 backdrop-blur-md"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--color-background) 45%, transparent)",
                                        borderColor: "var(--color-border)",
                                    }}
                                >
                                    {content.imageBadgeEyebrow && (
                                        <p className="text-[10px] uppercase tracking-[0.28em] text-(--color-accent-soft) sm:text-[11px]">
                                            {content.imageBadgeEyebrow}
                                        </p>
                                    )}

                                    {content.imageBadgeBody && (
                                        <p className="mt-2 text-sm leading-6 text-(--color-text-muted) sm:text-base sm:leading-7">
                                            {content.imageBadgeBody}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </SectionFrame>

            <AnimatePresence>
                {open && hasModal && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close section overlay"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-70 bg-red-600/75 backdrop-blur-sm"
                        />

                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`${content.id}-modal-title`}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed inset-x-4 top-6 z-80 mx-auto max-h-[calc(100dvh-3rem)] max-w-3xl overflow-y-auto rounded-4xl border border-(--color-border) bg-(--color-surface) p-6 text-(--color-text) shadow-2xl sm:p-8"
                        >
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-accent)">
                                    {content.modalEyebrow ?? content.eyebrow}
                                </p>

                                <button
                                    type="button"
                                    aria-label="Close section modal"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-muted) text-(--color-text-muted) transition hover:bg-(--color-surface) hover:text-(--color-text)"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <h2
                                id={`${content.id}-modal-title`}
                                className="text-3xl font-semibold leading-tight text-(--color-text) sm:text-4xl"
                            >
                                {content.modalHeading}
                            </h2>

                            <div className="mt-6 space-y-5 text-sm leading-7 text-(--color-text-muted) sm:text-base sm:leading-8">
                                {content.modalBody?.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}