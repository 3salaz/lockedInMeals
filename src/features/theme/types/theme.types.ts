export type SiteTheme = {
    id: string;
    name?: string;

    colors: {
        background: string;
        surface: string;
        surfaceMuted: string;
        text: string;
        textMuted: string;
        accent: string;
        accentSoft: string;
        border: string;
    };

    updatedAt?: Date;
};