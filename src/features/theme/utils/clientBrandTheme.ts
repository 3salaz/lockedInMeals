// src/features/theme/utils/clientBrandTheme.ts

import type { SiteTheme } from "../types/theme.types";

const env = import.meta.env;

const clientName = env.VITE_CLIENT_NAME || "Client";
const brandBackground = env.VITE_BRAND_BACKGROUND_COLOR || "#0A0A0A";
const brandText = env.VITE_BRAND_TEXT_COLOR || "#FFFFFF";
const brandAccent = env.VITE_BRAND_PRIMARY_COLOR || "#6BFF2A";

export const clientBrandTheme: SiteTheme = {
    id: "client-brand",
    name: `${clientName} Brand`,
    colors: {
        background: brandBackground,
        surface: "#141414",
        surfaceMuted: "#1F1F1F",
        text: brandText,
        textMuted: "#B8B8B8",
        accent: brandAccent,
        accentSoft: brandAccent,
        border: "rgba(255,255,255,0.14)",
    },
};

export const clientBrandThemePresets: SiteTheme[] = [
    clientBrandTheme,

    {
        id: "client-brand-deep",
        name: `${clientName} Deep`,
        colors: {
            background: "#050505",
            surface: "#101010",
            surfaceMuted: "#1A1A1A",
            text: brandText,
            textMuted: "#AFAFAF",
            accent: brandAccent,
            accentSoft: "#1F7A1F",
            border: "rgba(255,255,255,0.12)",
        },
    },

    {
        id: "client-brand-clean",
        name: `${clientName} Clean`,
        colors: {
            background: "#F7F8F4",
            surface: "#FFFFFF",
            surfaceMuted: "#E9EEE4",
            text: "#101510",
            textMuted: "#5F665E",
            accent: brandAccent,
            accentSoft: "#1F7A1F",
            border: "rgba(16,21,16,0.14)",
        },
    },

    {
        id: "client-brand-athletic",
        name: `${clientName} Athletic`,
        colors: {
            background: "#0A0A0A",
            surface: "#111A11",
            surfaceMuted: "#182818",
            text: brandText,
            textMuted: "#B8C4B8",
            accent: brandAccent,
            accentSoft: "#2DFF7A",
            border: "rgba(107,255,42,0.22)",
        },
    },
];