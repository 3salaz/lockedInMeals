import AdminLoginForm from "@/features/admin/auth/components/AdminLoginForm";
import { clientConfig } from "@/config/clientConfig";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-(--color-background) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
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
          </div>

          <div className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">Admin Login</h2>

              <p className="mt-2 text-sm text-(--color-text-muted)">
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