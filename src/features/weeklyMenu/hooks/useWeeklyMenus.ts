import { useEffect, useState } from "react";

import { getWeeklyMenus } from "../services/weeklyMenuService";
import type { WeeklyMenu } from "../types/weeklyMenu.types";

export function useWeeklyMenus() {
    const [weeklyMenus, setWeeklyMenus] = useState<WeeklyMenu[]>([]);
    const [loadingWeeklyMenus, setLoadingWeeklyMenus] = useState(true);
    const [weeklyMenusError, setWeeklyMenusError] = useState("");

    async function loadWeeklyMenus() {
        try {
            setLoadingWeeklyMenus(true);
            setWeeklyMenusError("");

            const menus = await getWeeklyMenus();
            setWeeklyMenus(menus);
        } catch (error) {
            setWeeklyMenusError(
                error instanceof Error ? error.message : "Failed to load weekly menus.",
            );
        } finally {
            setLoadingWeeklyMenus(false);
        }
    }

    useEffect(() => {
        void loadWeeklyMenus();
    }, []);

    return {
        weeklyMenus,
        loadingWeeklyMenus,
        weeklyMenusError,
        reloadWeeklyMenus: loadWeeklyMenus,
    };
}