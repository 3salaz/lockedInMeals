import type { SiteTheme } from "@/features/theme/types/theme.types";
import { clientBrandTheme, clientBrandThemePresets } from "./clientBrandTheme";

export type ThemePreset = {
    name: string;
    description: string;
    theme: SiteTheme;
};

const clientPresetDescriptions: Record<string, string> = {
    "client-brand": "Primary brand colors pulled from environment settings.",
    "client-brand-deep": "Darker, stronger version of the client brand.",
    "client-brand-clean": "Light, clean version of the client brand.",
    "client-brand-athletic":
        "High-energy brand variation with stronger accent contrast.",
};

const clientPresets: ThemePreset[] = clientBrandThemePresets.map((theme) => ({
    name: theme.name ?? "Client Brand",
    description: clientPresetDescriptions[theme.id] ?? "Client brand variation.",
    theme,
}));


export const themePresets: ThemePreset[] = [
    ...clientPresets,
    {
        name: clientBrandTheme.name ?? "Client Brand",
        description: "Primary brand colors pulled from environment settings.",
        theme: clientBrandTheme,
    },
    {
        name: "Classic Dark",
        description: "Current Wine Chapel dark luxury palette.",
        theme: {
            id: "classic-dark",
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
        },
    },
    {
        name: "Wine Cellar",
        description: "Deep burgundy, cellar shadows, and warm gold.",
        theme: {
            id: "wine-cellar",
            colors: {
                background: "#12070A",
                surface: "#1D0D12",
                surfaceMuted: "#2A141B",
                text: "#FFF4EA",
                textMuted: "#C9B7AA",
                accent: "#C9A46A",
                accentSoft: "#7A2638",
                border: "rgba(255, 244, 234, 0.14)",
            },
        },
    },
    {
        name: "Champagne Light",
        description: "Soft, bright, editorial, and welcoming.",
        theme: {
            id: "champagne-light",
            colors: {
                background: "#F8F3EA",
                surface: "#FFFFFF",
                surfaceMuted: "#EFE4D4",
                text: "#1B1712",
                textMuted: "#6E6255",
                accent: "#B58A52",
                accentSoft: "#C96F45",
                border: "rgba(27, 23, 18, 0.14)",
            },
        },
    },
    {
        name: "Rustic Chapel",
        description: "Earthy clay, aged stone, and rustic warmth.",
        theme: {
            id: "rustic-chapel",
            colors: {
                background: "#211712",
                surface: "#2C2019",
                surfaceMuted: "#3A2A20",
                text: "#FAEFE3",
                textMuted: "#CDBBAD",
                accent: "#D19A5C",
                accentSoft: "#9A4F2F",
                border: "rgba(250, 239, 227, 0.13)",
            },
        },
    },
    {
        name: "Editorial Cream",
        description: "Magazine-style cream with dark typography.",
        theme: {
            id: "editorial-cream",
            colors: {
                background: "#F4EFE6",
                surface: "#E8DDCC",
                surfaceMuted: "#DDD0BC",
                text: "#15110D",
                textMuted: "#62584D",
                accent: "#9A693A",
                accentSoft: "#2F3E46",
                border: "rgba(21, 17, 13, 0.16)",
            },
        },
    },
];