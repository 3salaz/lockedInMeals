type DashboardCardProps = {
    title: string;
    value: string;
    description: string;
};

export default function DashboardCard({
    title,
    value,
    description,
}: DashboardCardProps) {
    return (
        <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
            <p className="text-sm text-(--color-text-muted)">{title}</p>

            <p className="mt-4 text-3xl font-semibold text-(--color-accent-soft)">
                {value}
            </p>

            <p className="mt-3 text-sm leading-6 text-(--color-text-muted)">
                {description}
            </p>
        </div>
    );
}