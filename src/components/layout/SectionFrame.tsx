// src/components/layout/SectionFrame.tsx

import type { ReactNode } from "react";

type SectionFrameProps = {
    id: string;
    children: ReactNode;
    background?: ReactNode;
    className?: string;
    contentClassName?: string;
    maxWidth?: "5xl" | "6xl" | "7xl";
    withDivider?: boolean;
    variant?: "flex" | "grid";
    snap?: boolean;
    fullHeight?: boolean;
};

const maxWidthClasses = {
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
};

export default function SectionFrame({
    id,
    children,
    background,
    className = "",
    contentClassName = "",
    maxWidth = "7xl",
    withDivider = true,
    variant = "flex",
    snap = true,
    fullHeight = true,
}: SectionFrameProps) {
    const layoutClass =
        variant === "grid"
            ? "grid h-full items-center"
            : "flex h-full items-center ";

    return (
        <section
            id={id}
            className={[
                "relative isolate overflow-hidden bg-(--color-surface-muted) text-(--color-text)",
                fullHeight ? "h-dvh" : "min-h-0",
                snap ? "snap-start snap-always" : "",
                className,
            ].join(" ")}
        >
            {background}

            {withDivider && (
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-border) to-transparent" />
            )}

            <div
                className={[
                    "relative z-10 mx-auto w-full px-5 sm:px-8 sm:pb-12  lg:px-10 xl:px-0",
                    maxWidthClasses[maxWidth],
                    layoutClass,
                    contentClassName,
                ].join(" ")}
            >
                {children}
            </div>
        </section>
    );
}