import {
    doc,
    getDoc,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import type { HomepageContent } from "../types/homepageContent.types";
import { defaultHomepageContent } from "../utils/defaultHomepageContent";

const HOMEPAGE_DOC_REF = doc(db, "siteContent", "homepage");

function normalizeHomepageContent(data: Partial<HomepageContent>): HomepageContent {
    return {
        ...defaultHomepageContent,
        ...data,
        hero: {
            ...defaultHomepageContent.hero,
            ...data.hero,
        },
    };
}

export async function getHomepageContent(): Promise<HomepageContent> {
    const snapshot = await getDoc(HOMEPAGE_DOC_REF);

    if (!snapshot.exists()) {
        return defaultHomepageContent;
    }

    return normalizeHomepageContent(snapshot.data() as Partial<HomepageContent>);
}

export function subscribeToHomepageContent(
    onContentChange: (content: HomepageContent) => void,
    onError?: (error: Error) => void,
): Unsubscribe {
    return onSnapshot(
        HOMEPAGE_DOC_REF,
        (snapshot) => {
            if (!snapshot.exists()) {
                onContentChange(defaultHomepageContent);
                return;
            }

            onContentChange(
                normalizeHomepageContent(snapshot.data() as Partial<HomepageContent>),
            );
        },
        (error) => {
            console.error("Homepage content subscription failed:", error);
            onError?.(error);
        },
    );
}

export async function updateHomepageContent(content: HomepageContent) {
    await setDoc(
        HOMEPAGE_DOC_REF,
        {
            ...content,
            updatedAt: serverTimestamp(),
        },
        { merge: true },
    );
}