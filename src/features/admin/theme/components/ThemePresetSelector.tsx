import type { SiteTheme } from "@/features/theme/types/theme.types";
import { themePresets } from "@/features/theme/utils/themePresets";

type ThemePresetSelectorProps = {
    selectedPresetId: string | null;
    onSelectPreset: (theme: SiteTheme) => void;
};

export default function ThemePresetSelector({
    selectedPresetId,
    onSelectPreset,
}: ThemePresetSelectorProps) {
    const selectedPreset = themePresets.find(
        (preset) => preset.theme.id === selectedPresetId,
    );

    return (
        <div className="rounded-3xl border border-(--preview-color-border,var(--color-border)) bg-(--preview-color-surface,var(--color-surface)) p-6 text-(--preview-color-text,var(--color-text))">
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-(--preview-color-accent,var(--color-accent))">
                    Presets
                </p>

                <h2 className="mt-3 text-xl font-semibold text-(--preview-color-text,var(--color-text))">
                    Start with a palette
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--preview-color-text-muted,var(--color-text-muted))">
                    Choose a starting theme, preview it, then tweak the colors before
                    saving.
                </p>

                {selectedPreset && (
                    <p className="mt-4 rounded-full border border-(--preview-color-border,var(--color-border)) bg-(--preview-color-surface-muted,var(--color-surface-muted)) px-4 py-2 text-xs text-(--preview-color-accent,var(--color-accent))">
                        Previewing: {selectedPreset.name}
                    </p>
                )}
            </div>

            <div className="mt-5 grid gap-3">
                {themePresets.map((preset) => {
                    const isSelected = preset.theme.id === selectedPresetId;

                    return (
                        <button
                            key={preset.theme.id}
                            type="button"
                            onClick={() => onSelectPreset(preset.theme)}
                            className={[
                                "rounded-2xl border p-4 text-left transition",
                                isSelected
                                    ? "border-(--preview-color-accent,var(--color-accent)) bg-(--preview-color-surface-muted,var(--color-surface-muted)) ring-2 ring-(--preview-color-accent,var(--color-accent))/30"
                                    : "border-(--preview-color-border,var(--color-border)) bg-(--preview-color-surface-muted,var(--color-surface-muted)) hover:border-(--preview-color-accent,var(--color-accent))",
                            ].join(" ")}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium text-(--preview-color-text,var(--color-text))">
                                            {preset.name}
                                        </p>

                                        {isSelected && (
                                            <span className="rounded-full bg-(--preview-color-accent,var(--color-accent)) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--preview-color-background,var(--color-background))">
                                                Selected
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-1 text-sm leading-5 text-(--preview-color-text-muted,var(--color-text-muted))">
                                        {preset.description}
                                    </p>
                                </div>

                                <div className="flex shrink-0 gap-1 pt-1">
                                    <span
                                        className="h-4 w-4 rounded-full border"
                                        style={{
                                            backgroundColor: preset.theme.colors.background,
                                            borderColor: preset.theme.colors.border,
                                        }}
                                    />
                                    <span
                                        className="h-4 w-4 rounded-full border"
                                        style={{
                                            backgroundColor: preset.theme.colors.surface,
                                            borderColor: preset.theme.colors.border,
                                        }}
                                    />
                                    <span
                                        className="h-4 w-4 rounded-full border"
                                        style={{
                                            backgroundColor: preset.theme.colors.accent,
                                            borderColor: preset.theme.colors.border,
                                        }}
                                    />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}