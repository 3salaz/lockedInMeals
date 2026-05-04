import type { SiteTheme } from "../types/theme.types";

/**
 * Default Wine Chapel theme.
 *
 * This is used:
 * - before Firestore loads
 * - if no saved theme exists yet
 * - when resetting the website theme
 */
export const defaultSiteTheme: SiteTheme = {
    id: "default",

    colors: {
        background: "#0A0A0A",
        surface: "#141414",
        surfaceMuted: "#1E1E1E",
        text: "#F8F6F2",
        textMuted: "#B8B2A7",
        accent: "#D8C3A5",
        accentSoft: "#B85C38",
        border: "rgba(255, 255, 255, 0.12)",
    },
};