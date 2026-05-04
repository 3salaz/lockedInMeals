import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "@/lib/firebase/firebase";
import { isAllowedAdminEmail } from "./allowedAdminEmails";

/**
 * Google provider for Firebase Auth.
 *
 * This allows admins/clients to sign in using Gmail or Google Workspace.
 */
const googleProvider = new GoogleAuthProvider();

/**
 * Signs in using Google popup.
 *
 * After Google login succeeds, we check the user's email against our allowlist.
 * If their email is not approved, we immediately sign them out.
 */
export async function loginAdminWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!isAllowedAdminEmail(user.email)) {
        await signOut(auth);
        throw new Error("This Google account is not approved for admin access.");
    }

    return user;
}

/**
 * Logs out the current Firebase user.
 */
export function logoutAdmin() {
    return signOut(auth);
}

/**
 * Watches Firebase auth state.
 *
 * This only tells us whether a Firebase user is logged in.
 * The admin hook will also check whether the email is allowed.
 */
export function listenToAdminAuth(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}