export default function DashboardHeader() {
    return (
        <header className="mb-8 flex flex-col gap-4 border-b border-(--color-border) pb-6 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent)">
                    Admin Dashboard
                </p>

                <h1 className="mt-3 text-3xl font-semibold text-(--color-text) md:text-4xl">
                    Welcome back
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                    Manage site content, featured wine experiences, partners, and future
                    CMS tools from here.
                </p>
            </div>
        </header>
    );
}