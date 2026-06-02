import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = {
    label: string;
    href: string;
};

type SiteNavProps = {
    brandLabel: string;
    links: NavLink[];
    ctaLabel: string;
    ctaHref: string;
};

export default function SiteNav({
    brandLabel,
    links,
    ctaLabel,
    ctaHref,
}: SiteNavProps) {
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const safeLinks = useMemo(
        () => links.filter((link) => link.label.trim() && link.href.startsWith("#")),
        [links],
    );

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const container = document.getElementById("top");

        // Not on the homepage (e.g. admin) — always show
        if (!container) {
            setIsVisible(true);
            return;
        }

        const update = () => setIsVisible(container.scrollTop < 80);
        update();
        container.addEventListener("scroll", update, { passive: true });
        return () => container.removeEventListener("scroll", update);
    }, []);

    const closeMenu = () => setOpen(false);

    const scrollToSection = (href: string) => {
        if (!href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setOpen(false);
    };

    return (
        <>
            <header
                className={[
                    "fixed inset-x-0 top-0 z-50 transition-transform duration-200 ease-out",
                    isVisible || open ? "translate-y-0" : "-translate-y-full",
                ].join(" ")}
            >
                <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
                    <div
                        className="flex items-center justify-between rounded-full border px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-background) 72%, transparent)",
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => scrollToSection("#top")}
                            className="max-w-44 text-left text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-(--color-text) sm:max-w-none sm:text-[0.8rem]"
                        >
                            {brandLabel}
                        </button>

                        <div className="hidden items-center gap-8 md:flex">
                            <nav className="flex items-center gap-2">
                                {safeLinks.map((link) => (
                                    <button
                                        key={`${link.label}-${link.href}`}
                                        type="button"
                                        onClick={() => scrollToSection(link.href)}
                                        className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface)"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </nav>

                            {ctaLabel && ctaHref && (
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(ctaHref)}
                                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--color-accent-soft) px-5 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02]"
                                >
                                    {ctaLabel}
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((prev) => !prev)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition hover:bg-(--color-surface-muted) md:hidden"
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close menu overlay"
                            onClick={closeMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="fixed inset-x-4 top-24 z-50 rounded-4xl border p-5 shadow-2xl md:hidden"
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--color-surface) 95%, transparent)",
                                borderColor: "var(--color-border)",
                            }}
                        >
                            <nav className="flex flex-col gap-2">
                                {safeLinks.map((link) => (
                                    <button
                                        key={`${link.label}-${link.href}`}
                                        type="button"
                                        onClick={() => scrollToSection(link.href)}
                                        className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-(--color-text-muted) transition hover:bg-(--color-surface-muted) hover:text-(--color-text)"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </nav>

                            {ctaLabel && ctaHref && (
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(ctaHref)}
                                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-(--color-accent) px-5 text-sm font-semibold text-(--color-background)"
                                >
                                    {ctaLabel}
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}