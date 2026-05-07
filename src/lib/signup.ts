import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";

const normalizeEmail = (email: string) => {
    return email.trim().toLowerCase();
};

export async function signupForUpdates(email: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        throw new Error("Please enter a valid email address.");
    }

    const signupRef = doc(db, "webSignups", normalizedEmail);

    await setDoc(signupRef, {
        email: normalizedEmail,
        source: "web-landing-page",
        createdAt: serverTimestamp(),
    });

    return {
        status: "created" as const,
        message: "You’re on the list.",
    };
}