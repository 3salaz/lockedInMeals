import { useEffect, useState } from "react";

import { getSiteTheme, updateSiteTheme } from "../api/themeApi";
import type { SiteTheme } from "../types/theme.types";
import { defaultSiteTheme } from "../utils/defaultTheme";

/**
 * Shared theme hook.
 *
 * Used by:
 * - the public website to load the active theme
 * - the admin dashboard to edit and save the theme
 */
export function useSiteTheme() {
    const [theme, setTheme] = useState<SiteTheme>(defaultSiteTheme);
    const [loadingTheme, setLoadingTheme] = useState(true);
    const [savingTheme, setSavingTheme] = useState(false);
    const [themeError, setThemeError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadTheme() {
            try {
                setLoadingTheme(true);
                setThemeError("");

                const siteTheme = await getSiteTheme();

                if (isMounted) {
                    setTheme(siteTheme);
                }
            } catch (error) {
                console.error("Failed to load site theme:", error);

                if (isMounted) {
                    setTheme(defaultSiteTheme);
                    setThemeError("Failed to load website theme.");
                }
            } finally {
                if (isMounted) {
                    setLoadingTheme(false);
                }
            }
        }

        loadTheme();

        return () => {
            isMounted = false;
        };
    }, []);

    async function saveTheme(nextTheme: SiteTheme) {
        try {
            setSavingTheme(true);
            setThemeError("");

            await updateSiteTheme(nextTheme);
            setTheme(nextTheme);
        } catch (error) {
            console.error("Failed to save site theme:", error);
            setThemeError("Failed to save website theme.");
        } finally {
            setSavingTheme(false);
        }
    }

    return {
        theme,
        setTheme,
        loadingTheme,
        savingTheme,
        themeError,
        saveTheme,
    };
}