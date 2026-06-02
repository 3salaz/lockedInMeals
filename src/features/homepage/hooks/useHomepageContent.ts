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
                // Merge with defaults so fields added after the Firestore doc was
                // first saved (e.g. socialLinks) are populated from defaultHomepageContent.
                setHomepageContent({
                    ...defaultHomepageContent,
                    ...content,
                    nav: { ...defaultHomepageContent.nav, ...content.nav },
                    settings: {
                        ...defaultHomepageContent.settings,
                        ...content.settings,
                        parallax: {
                            ...defaultHomepageContent.settings.parallax,
                            ...content.settings?.parallax,
                        },
                    },
                    hero: { ...defaultHomepageContent.hero, ...content.hero },
                    featureStory: { ...defaultHomepageContent.featureStory, ...content.featureStory },
                    contact: { ...defaultHomepageContent.contact, ...content.contact },
                });
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