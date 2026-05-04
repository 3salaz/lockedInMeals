import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type { SiteTheme } from "../types/theme.types";
import { defaultSiteTheme } from "../utils/defaultTheme";

/**
 * Firestore location for the active website theme.
 *
 * Collection: siteConfig
 * Document: theme
 *
 * This keeps the site theme in one predictable place:
 * siteConfig/theme
 */
const THEME_DOC_REF = doc(db, "siteConfig", "theme");

/**
 * Reads the active website theme from Firestore.
 *
 * If no saved theme exists yet, we return the default theme so the website
 * still has a complete color system.
 */
export async function getSiteTheme(): Promise<SiteTheme> {
    const snapshot = await getDoc(THEME_DOC_REF);

    if (!snapshot.exists()) {
        return defaultSiteTheme;
    }

    const data = snapshot.data();

    return {
        ...defaultSiteTheme,
        ...data,
        colors: {
            ...defaultSiteTheme.colors,
            ...data.colors,
        },
    } as SiteTheme;
}

/**
 * Saves the website theme to Firestore.
 *
 * We use merge so future settings like images, fonts, or section options
 * do not get accidentally deleted.
 */
export async function updateSiteTheme(theme: SiteTheme) {
    await setDoc(
        THEME_DOC_REF,
        {
            ...theme,
            updatedAt: serverTimestamp(),
        },
        { merge: true },
    );
}