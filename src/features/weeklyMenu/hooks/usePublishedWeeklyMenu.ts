import { useEffect, useState } from "react";

import { getPublishedWeeklyMenu } from "../services/weeklyMenuService";
import type { WeeklyMenu } from "../types/weeklyMenu.types";

export function usePublishedWeeklyMenu() {
    const [publishedWeeklyMenu, setPublishedWeeklyMenu] =
        useState<WeeklyMenu | null>(null);
    const [loadingPublishedWeeklyMenu, setLoadingPublishedWeeklyMenu] =
        useState(true);
    const [publishedWeeklyMenuError, setPublishedWeeklyMenuError] = useState("");

    async function loadPublishedWeeklyMenu() {
        try {
            setLoadingPublishedWeeklyMenu(true);
            setPublishedWeeklyMenuError("");

            const menu = await getPublishedWeeklyMenu();
            setPublishedWeeklyMenu(menu);
        } catch (error) {
            setPublishedWeeklyMenuError(
                error instanceof Error
                    ? error.message
                    : "Failed to load published weekly menu.",
            );
        } finally {
            setLoadingPublishedWeeklyMenu(false);
        }
    }

    useEffect(() => {
        void loadPublishedWeeklyMenu();
    }, []);

    return {
        publishedWeeklyMenu,
        loadingPublishedWeeklyMenu,
        publishedWeeklyMenuError,
        reloadPublishedWeeklyMenu: loadPublishedWeeklyMenu,
    };
}