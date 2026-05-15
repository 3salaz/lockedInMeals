import type { SiteTheme } from "@/features/theme/types/theme.types";

type ThemePreviewCardProps = {
    theme: SiteTheme;
};

export default function ThemePreviewCard({ theme }: ThemePreviewCardProps) {
    return (
        <div
            className="rounded-3xl border p-6"
            style={{
                background: theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
            }}
        >
            <p
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: theme.colors.accent }}
            >
                Live Preview
            </p>

            <h3 className="mt-4 text-3xl font-semibold">{import.meta.env.VITE_CLIENT_NAME}</h3>

            <p
                className="mt-4 max-w-md text-sm leading-6"
                style={{ color: theme.colors.textMuted }}
            >
                A preview of how the site palette will feel across cards, backgrounds,
                text, borders, and accent elements.
            </p>

            <div
                className="mt-6 rounded-2xl border p-5"
                style={{
                    background: theme.colors.surface,
                    borderColor: theme.colors.border,
                }}
            >
                <p className="text-lg font-medium">Curated Wine Experience</p>

                <p className="mt-2 text-sm" style={{ color: theme.colors.textMuted }}>
                    Private tastings, storytelling, and intimate hospitality.
                </p>

                <button
                    type="button"
                    className="mt-5 rounded-xl px-4 py-2 text-sm font-medium"
                    style={{
                        background: theme.colors.accent,
                        color: theme.colors.background,
                    }}
                >
                    Preview Button
                </button>
            </div>
        </div>
    );
}