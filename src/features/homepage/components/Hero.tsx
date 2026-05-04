import HeroSection from "./HeroSection";

import { useHomepageContent } from "@/features/homepage/hooks/useHomepageContent";

export default function Hero() {
    const { homepageContent, loadingHomepageContent } = useHomepageContent();

    if (loadingHomepageContent) {
        return <HeroLoadingSection />;
    }

    return <HeroSection hero={homepageContent.hero} />;
}

function HeroLoadingSection() {
    return (
        <section className="relative isolate h-dvh snap-start snap-always overflow-hidden bg-(--color-background) text-(--color-text)">
            <div className="absolute inset-0 animate-pulse bg-(--color-surface)" />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 20%, transparent), var(--color-background))",
                }}
            />

            <div className="relative z-10 mx-auto grid h-full max-w-7xl items-center px-5 pb-10 pt-32 sm:px-8 lg:px-10 xl:px-0">
                <div className="max-w-4xl">
                    <div className="h-4 w-56 animate-pulse rounded-full bg-(--color-surface-muted)" />

                    <div className="mt-6 space-y-4">
                        <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-(--color-surface-muted) sm:h-16" />
                        <div className="h-12 w-10/12 max-w-2xl animate-pulse rounded-2xl bg-(--color-surface-muted) sm:h-16" />
                        <div className="h-12 w-8/12 max-w-xl animate-pulse rounded-2xl bg-(--color-surface-muted) sm:h-16" />
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-(--color-surface-muted)" />
                        <div className="h-4 w-11/12 max-w-xl animate-pulse rounded-full bg-(--color-surface-muted)" />
                        <div className="h-4 w-8/12 max-w-lg animate-pulse rounded-full bg-(--color-surface-muted)" />
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <div className="h-12 w-48 animate-pulse rounded-full bg-(--color-surface-muted)" />
                        <div className="h-12 w-44 animate-pulse rounded-full bg-(--color-surface-muted)" />
                    </div>
                </div>
            </div>
        </section>
    );
}