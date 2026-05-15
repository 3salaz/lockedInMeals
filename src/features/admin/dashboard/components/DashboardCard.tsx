type DashboardCardProps = {
    title: string;
    value: string;
    description?: string;

    href?: string;
    actionLabel?: string;

    status?: "success" | "warning" | "draft";
};

const statusStyles = {
    success:
        "border border-green-500/20 bg-green-500/10 text-green-400",

    warning:
        "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

    draft:
        "border border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
};

export default function DashboardCard({
    title,
    value,
    description,
    href,
    actionLabel,
    status,
}: DashboardCardProps) {
    return (
        <div className="flex h-full flex-col rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-(--color-text-muted)">
                    {title}
                </p>

                {status && (
                    <span
                        className={[
                            "rounded-full px-2.5 py-1 text-[11px] font-medium capitalize",
                            statusStyles[status],
                        ].join(" ")}
                    >
                        {status}
                    </span>
                )}
            </div>

            <p className="mt-4 text-3xl font-semibold text-(--color-accent-soft)">
                {value}
            </p>

            {description && (
                <p className="mt-3 text-sm leading-6 text-(--color-text-muted)">
                    {description}
                </p>
            )}

            {href && actionLabel && (
                <div className="mt-auto pt-6">
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm font-medium text-(--color-accent-soft) transition hover:opacity-80"
                    >
                        {actionLabel}
                        <span className="ml-1">→</span>
                    </a>
                </div>
            )}
        </div>
    );
}