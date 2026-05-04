import { useEffect, useState } from "react";

import {
    subscribeToHomepageContent,
    updateHomepageContent,
} from "../api/homepageContentApi";
import type { HomepageContent } from "../types/homepageContent.types";
import { defaultHomepageContent } from "../utils/defaultHomepageContent";

export function useHomepageContent() {
    const [homepageContent, setHomepageContent] =
        useState<HomepageContent>(defaultHomepageContent);

    const [loadingHomepageContent, setLoadingHomepageContent] = useState(true);
    const [savingHomepageContent, setSavingHomepageContent] = useState(false);
    const [homepageContentError, setHomepageContentError] = useState("");

    useEffect(() => {
        setLoadingHomepageContent(true);
        setHomepageContentError("");

        const unsubscribe = subscribeToHomepageContent(
            (content) => {
                setHomepageContent(content);
                setLoadingHomepageContent(false);
            },
            () => {
                setHomepageContent(defaultHomepageContent);
                setHomepageContentError("Failed to load homepage content.");
                setLoadingHomepageContent(false);
            },
        );

        return () => unsubscribe();
    }, []);

    async function saveHomepageContent(nextContent: HomepageContent) {
        try {
            setSavingHomepageContent(true);
            setHomepageContentError("");

            await updateHomepageContent(nextContent);

            // No need to manually setHomepageContent here.
            // Firestore onSnapshot will update local state automatically.
        } catch (error) {
            console.error("Failed to save homepage content:", error);
            setHomepageContentError("Failed to save homepage content.");
        } finally {
            setSavingHomepageContent(false);
        }
    }

    return {
        homepageContent,
        setHomepageContent,
        loadingHomepageContent,
        savingHomepageContent,
        homepageContentError,
        saveHomepageContent,
    };
}