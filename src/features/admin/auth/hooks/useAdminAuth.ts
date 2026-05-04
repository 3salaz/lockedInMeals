import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import { listenToAdminAuth, logoutAdmin } from "../utils/adminAuth";
import { isAllowedAdminEmail } from "../utils/allowedAdminEmails";

/**
 * Central admin auth hook.
 *
 * This checks two things:
 * 1. Is there a Firebase user?
 * 2. Is their email allowed to access the admin dashboard?
 */
export function useAdminAuth() {
    const [adminUser, setAdminUser] = useState<User | null>(null);
    const [loadingAdmin, setLoadingAdmin] = useState(true);

    useEffect(() => {
        const unsubscribe = listenToAdminAuth(async (user) => {
            if (!user) {
                setAdminUser(null);
                setLoadingAdmin(false);
                return;
            }

            const isAllowed = isAllowedAdminEmail(user.email);

            if (!isAllowed) {
                await logoutAdmin();
                setAdminUser(null);
                setLoadingAdmin(false);
                return;
            }

            setAdminUser(user);
            setLoadingAdmin(false);
        });

        return () => unsubscribe();
    }, []);

    return {
        adminUser,
        loadingAdmin,
        logoutAdmin,
        isAdminLoggedIn: Boolean(adminUser),
    };
}