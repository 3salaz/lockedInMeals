import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdminWithGoogle } from "../utils/adminAuth";

export default function AdminLoginForm() {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleGoogleLogin() {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await loginAdminWithGoogle();
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Google admin login failed:", error);

            setErrorMessage(
                "This Google account is not approved for admin access.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-5">
            {errorMessage && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                </p>
            )}

            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F8F6F2] px-5 py-3 font-medium text-[#0A0A0A] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0A0A0A]">
                    G
                </span>

                {isSubmitting ? "Signing in..." : "Continue with Google"}
            </button>

            <p className="text-center text-xs leading-5 text-white/40">
                Access is limited to approved Wine Chapel admin accounts.
            </p>
        </div>
    );
}   