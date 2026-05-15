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

    const handleSignIn = () => {
        console.log("coming soon")
    }
    return (
        <div className="">
            {errorMessage && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                </p>
            )}
            <form className="container">
                <section className="flex flex-col w-full gap-2 pb-2">
                    <div className="p-3 my-2 bg-slate-100 rounded-md">
                        <input type="email" placeholder="Email" className="w-full"></input>
                    </div>
                    <div className="p-3 m bg-slate-100 rounded-md">
                        <input type="password" placeholder="Password" className="w-full"></input>
                    </div>
                    <button type="button" onClick={handleSignIn} disabled={isSubmitting} className="bg-green-300 px-5 py-3 rounded-md">Login</button>
                </section>

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
            </form>

            <p className="text-center text-xs leading-5 text-white/40">
                Access is limited to approved {import.meta.env.VITE_CLIENT_NAME} admin accounts.
            </p>
        </div>
    );
}   