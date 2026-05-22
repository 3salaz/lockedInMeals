import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import ThemeColorInput from "../components/ThemeColorInput";
import ThemePreviewCard from "../components/ThemePreviewCard";
import ThemePresetSelector from "../components/ThemePresetSelector";

import { useSiteTheme } from "@/features/theme/hooks/useSiteTheme";
import type { SiteTheme } from "@/features/theme/types/theme.types";
import { defaultSiteTheme } from "@/features/theme/utils/defaultTheme";
import { applyThemeToDocument } from "@/features/theme/utils/applyThemeToDocument";
import { getInvalidThemeColorFields } from "@/features/theme/utils/colorValidation";

const colorLabels: Record<string, string> = {
    background: "Background",
    surface: "Card Surface",
    surfaceMuted: "Muted Surface",
    text: "Main Text",
    textMuted: "Muted Text",
    accent: "Accent",
    accentSoft: "Soft Accent",
    border: "Border",
};

export default function AdminThemePage() {
    const {
        theme,
        setTheme,
        loadingTheme,
        savingTheme,
        themeError,
        saveTheme,
    } = useSiteTheme();

    const [savedThemeSnapshot, setSavedThemeSnapshot] = useState("");
    const [lastSavedTheme, setLastSavedTheme] = useState<SiteTheme | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

    const currentThemeSnapshot = useMemo(() => {
        return JSON.stringify(theme.colors);
    }, [theme.colors]);

    const invalidColorFields = useMemo(() => {
        return getInvalidThemeColorFields(theme.colors);
    }, [theme.colors]);

    const hasInvalidColors = invalidColorFields.length > 0;

    const invalidColorMessage = hasInvalidColors
        ? `Fix invalid color values: ${invalidColorFields
            .map((field) => colorLabels[field] ?? field)
            .join(", ")}. Use #fff, #ffffff, rgb(...), or rgba(...).`
        : "";

    const hasUnsavedChanges =
        Boolean(savedThemeSnapshot) && currentThemeSnapshot !== savedThemeSnapshot;

    const previewStyle = {
        "--preview-color-background": theme.colors.background,
        "--preview-color-surface": theme.colors.surface,
        "--preview-color-surface-muted": theme.colors.surfaceMuted,
        "--preview-color-text": theme.colors.text,
        "--preview-color-text-muted": theme.colors.textMuted,
        "--preview-color-accent": theme.colors.accent,
        "--preview-color-accent-soft": theme.colors.accentSoft,
        "--preview-color-border": theme.colors.border,
    } as CSSProperties;

    useEffect(() => {
        if (!loadingTheme && !savedThemeSnapshot) {
            setSavedThemeSnapshot(JSON.stringify(theme.colors));
            setLastSavedTheme(theme);
        }
    }, [loadingTheme, savedThemeSnapshot, theme]);

    useEffect(() => {
        if (!hasUnsavedChanges) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    function updateColor(colorKey: keyof typeof theme.colors, value: string) {
        setSuccessMessage("");
        setSelectedPresetId(null);

        setTheme({
            ...theme,
            colors: {
                ...theme.colors,
                [colorKey]: value,
            },
        });
    }

    function handleSelectPreset(nextTheme: SiteTheme) {
        setSuccessMessage("");
        setSelectedPresetId(nextTheme.id);

        setTheme({
            ...nextTheme,
            colors: {
                ...nextTheme.colors,
            },
        });
    }

    async function handleSaveTheme() {
        if (hasInvalidColors) return;

        await saveTheme(theme);
        applyThemeToDocument(theme);

        setSavedThemeSnapshot(JSON.stringify(theme.colors));
        setLastSavedTheme(theme);
        setSuccessMessage("Theme saved successfully.");
    }

    async function handleResetTheme() {
        await saveTheme(defaultSiteTheme);
        applyThemeToDocument(defaultSiteTheme);

        setTheme(defaultSiteTheme);
        setSelectedPresetId(defaultSiteTheme.id);
        setSavedThemeSnapshot(JSON.stringify(defaultSiteTheme.colors));
        setLastSavedTheme(defaultSiteTheme);
        setSuccessMessage("Theme reset to default.");
    }

    function handleCancelChanges() {
        if (!lastSavedTheme) return;

        setTheme(lastSavedTheme);
        setSelectedPresetId(null);
        setSuccessMessage("Unsaved changes cancelled.");
    }

    if (loadingTheme) {
        return (
            <section className="text-(--color-text)">
                <p className="text-sm uppercase tracking-[0.35em] text-(--color-accent-soft)">
                    Loading Theme
                </p>
            </section>
        );
    }

    return (
        <section className="text-(--color-text)">
            <header className="mb-8 border-b border-(--color-border) pb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent-soft)">
                            Website Theme
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold text-(--color-text) md:text-4xl">
                            Theme Editor
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                            Update the website color palette. Changes stay in preview until
                            you save them.
                        </p>
                    </div>

                    {hasUnsavedChanges && (
                        <p className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs text-(--color-accent)">
                            Unsaved changes
                        </p>
                    )}
                </div>
            </header>

            {themeError && (
                <p className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {themeError}
                </p>
            )}

            {invalidColorMessage && (
                <p className="mb-6 rounded-xl border border-yellow-400/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
                    {invalidColorMessage}
                </p>
            )}

            {successMessage && (
                <p className="mb-6 rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                    {successMessage}
                </p>
            )}

            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                    <div style={previewStyle}>
                        <ThemePresetSelector
                            selectedPresetId={selectedPresetId}
                            onSelectPreset={handleSelectPreset}
                        />
                    </div>

                    <div
                        style={previewStyle}
                        className="rounded-3xl border border-(--preview-color-border) bg-(--preview-color-surface) p-6 text-(--preview-color-text)"
                    >
                        <h2 className="text-xl font-semibold text-(--preview-color-text)">
                            Colors
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-(--preview-color-text-muted)">
                            Edit the palette below. The website will not change until Save
                            Theme is clicked.
                        </p>

                        <div className="mt-6 grid gap-5">
                            <ThemeColorInput
                                label="Background"
                                value={theme.colors.background}
                                isInvalid={invalidColorFields.includes("background")}
                                onChange={(value) => updateColor("background", value)}
                            />

                            <ThemeColorInput
                                label="Card Surface"
                                value={theme.colors.surface}
                                isInvalid={invalidColorFields.includes("surface")}
                                onChange={(value) => updateColor("surface", value)}
                            />

                            <ThemeColorInput
                                label="Muted Surface"
                                value={theme.colors.surfaceMuted}
                                isInvalid={invalidColorFields.includes("surfaceMuted")}
                                onChange={(value) => updateColor("surfaceMuted", value)}
                            />

                            <ThemeColorInput
                                label="Main Text"
                                value={theme.colors.text}
                                isInvalid={invalidColorFields.includes("text")}
                                onChange={(value) => updateColor("text", value)}
                            />

                            <ThemeColorInput
                                label="Muted Text"
                                value={theme.colors.textMuted}
                                isInvalid={invalidColorFields.includes("textMuted")}
                                onChange={(value) => updateColor("textMuted", value)}
                            />

                            <ThemeColorInput
                                label="Accent"
                                value={theme.colors.accent}
                                isInvalid={invalidColorFields.includes("accent")}
                                onChange={(value) => updateColor("accent", value)}
                            />

                            <ThemeColorInput
                                label="Soft Accent"
                                value={theme.colors.accentSoft}
                                isInvalid={invalidColorFields.includes("accentSoft")}
                                onChange={(value) => updateColor("accentSoft", value)}
                            />

                            <ThemeColorInput
                                label="Border"
                                value={theme.colors.border}
                                isInvalid={invalidColorFields.includes("border")}
                                onChange={(value) => updateColor("border", value)}
                            />
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                onClick={handleSaveTheme}
                                disabled={savingTheme || !hasUnsavedChanges || hasInvalidColors}
                                className="rounded-xl bg-(--preview-color-accent-soft) px-5 py-3 text-sm font-medium text-(--preview-color-background) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {savingTheme ? "Saving..." : "Save Theme"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancelChanges}
                                disabled={savingTheme || !hasUnsavedChanges}
                                className="rounded-xl border border-(--preview-color-border) px-5 py-3 text-sm text-(--preview-color-text-muted) transition hover:bg-(--preview-color-surface-muted) hover:text-(--preview-color-text) disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel Changes
                            </button>

                            <button
                                type="button"
                                onClick={handleResetTheme}
                                disabled={savingTheme}
                                className="rounded-xl border border-(--preview-color-border) px-5 py-3 text-sm text-(--preview-color-text-muted) transition hover:bg-(--preview-color-surface-muted) hover:text-(--preview-color-text) disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Reset Default
                            </button>
                        </div>
                    </div>
                </div>

                <div className="xl:sticky xl:top-8 xl:self-start">
                    <ThemePreviewCard theme={theme} />
                </div>
            </div>
        </section>
    );
}