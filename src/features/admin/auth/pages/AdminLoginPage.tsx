import AdminLoginForm from "@/features/admin/auth/components/AdminLoginForm";
import { clientConfig } from "@/config/clientConfig";

export default function AdminLoginPage() {
    return (
        <main className="container mx-auto p-2 h-dvh bg-(--color-background) text-(--color-text) flex justify-center items-center">
            <section className="container mx-auto flex h-full max-w-6xl w-full items-center">
                <div className="grid w-full gap-2 lg:grid-cols-[1.1fr_0.9fr] lg:items-center p-2">

                    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-(--color-accent-soft)">
                        {clientConfig.brandName}
                    </p>


                    <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                        Admin dashboard for managing your website.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-(--color-text-muted)">
                        Update content, manage menus, adjust theme settings, and control
                        the public website from one private dashboard.
                    </p>
                    <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-lg backdrop-blur md:p-8 w-full">
                        <h2 className="text-2xl font-semibold pb-6">Admin Login</h2>


                        <AdminLoginForm />

                        <p className="mt-2 text-sm text-(--color-text-muted)">
                            Sign in with your approved admin account.
                        </p>
                    </div>
                </div>
            </section>
        </main >
    );
}