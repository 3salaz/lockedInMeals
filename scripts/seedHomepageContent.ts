import { applicationDefault, cert, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

import { lockedInMealsHomepageContent } from "./seeds/lockedInMealsHomepageContent";

const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

if (!projectId) {
    throw new Error("Missing VITE_FIREBASE_PROJECT_ID in .env");
}

initializeApp({
    credential: process.env.GOOGLE_APPLICATION_CREDENTIALS
        ? cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        : applicationDefault(),
    projectId,
});

const db = getFirestore();

async function seedHomepageContent() {
    await db.collection("siteContent").doc("homepage").set({
        ...lockedInMealsHomepageContent,
        updatedAt: FieldValue.serverTimestamp(),
    });

    console.log("Homepage content seeded successfully.");
}

seedHomepageContent().catch((error) => {
    console.error("Failed to seed homepage content:", error);
    process.exit(1);
});