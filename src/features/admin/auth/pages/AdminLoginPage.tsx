import AdminLoginForm from "@/features/admin/auth/components/AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-[#F8F6F2]">
            <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
                <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D8C3A5]">
                            The Wine Chapel
                        </p>

                        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                            Admin dashboard for managing the brand experience.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                            Update content, manage featured experiences, review partners, and
                            prepare future CMS tools from one private dashboard.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur md:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold">Admin Login</h2>
                            <p className="mt-2 text-sm text-white/55">
                                Sign in with your approved admin account.
                            </p>
                        </div>

                        <AdminLoginForm />
                    </div>
                </div>
            </section>
        </main>
    );
}