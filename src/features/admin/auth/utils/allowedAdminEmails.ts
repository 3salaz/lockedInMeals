/**
 * Approved admin emails for the  dashboard.
 *
 * Only these emails can access protected admin routes after Google login.
 *
 * IMPORTANT:
 * This is okay for an early private admin MVP.
 *
 * Later upgrade options:
 * - Store admin users in Firestore
 * - Use Firebase custom claims
 * - Use a Cloud Function to verify admin roles server-side
 */
export const allowedAdminEmails = [
    "3salaz.dev@gmail.com",
    "hatzistratisc@gmail.com",
] as const;

/**
 * Checks if a signed-in Firebase user email is allowed to access admin.
 */
export function isAllowedAdminEmail(email: string | null | undefined) {
    if (!email) return false;

    return allowedAdminEmails.includes(email.toLowerCase() as never);
}