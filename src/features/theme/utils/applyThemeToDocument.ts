import type { SiteTheme } from "../types/theme.types";

/**
 * Applies the active site theme to CSS variables on the document root.
 *
 * This lets components use:
 *
 * bg-(--color-background)
 * text-(--color-text)
 * border-(--color-border)
 */
export function applyThemeToDocument(theme: SiteTheme) {
    const root = document.documentElement;

    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-surface", theme.colors.surface);
    root.style.setProperty("--color-surface-muted", theme.colors.surfaceMuted);
    root.style.setProperty("--color-text", theme.colors.text);
    root.style.setProperty("--color-text-muted", theme.colors.textMuted);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-accent-soft", theme.colors.accentSoft);
    root.style.setProperty("--color-border", theme.colors.border);
}