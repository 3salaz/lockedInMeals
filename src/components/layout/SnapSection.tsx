import type { ReactNode } from "react";

type SnapSectionProps = {
    id: string;
    children: ReactNode;
    background?: ReactNode;
    className?: string;
    contentClassName?: string;
    maxWidth?: "5xl" | "6xl" | "7xl";
    withDivider?: boolean;
    variant?: "flex" | "grid";
};

const maxWidthClasses = {
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
};

export default function SnapSection({
    id,
    children,
    background,
    className = "",
    contentClassName = "",
    maxWidth = "7xl",
    withDivider = true,
    variant = "flex",
}: SnapSectionProps) {
    const layoutClass =
        variant === "grid"
            ? "grid h-full items-center"
            : "flex h-full items-center";

    return (
        <section
            id={id}
            className={[
                "relative isolate h-dvh snap-start snap-always overflow-hidden bg-(--color-background) text-(--color-text)",
                className,
            ].join(" ")}
        >
            {background}

            {withDivider && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
            )}

            <div
                className={[
                    "relative z-10 mx-auto w-full px-5 pb-8 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-10 xl:px-0",
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