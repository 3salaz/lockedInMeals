import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logoutAdmin } from "../../auth/utils/adminAuth";

const navItems = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        label: "Theme",
        path: "/admin/theme",
    },
    {
        label: "Homepage",
        path: "/admin/pages/home",
    },
    {
        label: "Meal Inventory",
        path: "/admin/meals",
    },
    {
        label: "Weekly Menu",
        path: "admin/weekly-menu"
    },
    {
        label: "Settings",
        path: "/admin/settings",
    },
];

export default function DashboardSidebar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    async function handleLogout() {
        await logoutAdmin();
        navigate("/admin/login");
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    const navContent = (
        <>
            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent)">
                    Client
                </p>

                <h2 className="mt-3 text-xl font-semibold text-(--color-text)">
                    Admin
                </h2>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            [
                                "block rounded-xl px-4 py-3 text-sm transition",
                                isActive
                                    ? "bg-(--color-accent) text-(--color-main)"
                                    : "text-(--color-text-muted) hover:bg-(--color-surface) hover:text-(--color-text)",
                            ].join(" ")
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                onClick={handleLogout}
                className="mt-10 w-full rounded-xl border border-(--color-border) px-4 py-3 text-left text-sm text-(--color-text-muted) transition hover:bg-(--color-surface) hover:text-(--color-text)"
            >
                Sign out
            </button>
        </>
    );

    return (
        <>
            <header className="sticky top-0 z-40 flex items-center justify-between border-b border-(--color-border) bg-(--color-background) px-5 py-4 backdrop-blur lg:hidden">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-(--color-accent)">
                        Client
                    </p>

                    <p className="mt-1 text-sm font-medium text-(--color-text)">
                        Admin
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="rounded-xl border border-(--color-border) px-4 py-2 text-sm text-(--color-text-muted)"
                >
                    Menu
                </button>
            </header>

            <aside className="hidden border-r border-(--color-border) bg-(--color-surface) p-6 lg:block">
                {navContent}
            </aside>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close menu overlay"
                        onClick={closeMobileMenu}
                        className="absolute inset-0 bg-black/70"
                    />

                    <aside className="relative z-10 h-full w-[82vw] max-w-sm border-r border-(--color-border) bg-(--color-background) p-6 text-(--color-text) shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-(--color-text)">
                                Menu
                            </p>

                            <button
                                type="button"
                                onClick={closeMobileMenu}
                                className="rounded-xl border border-(--color-border) px-3 py-2 text-sm text-(--color-text-muted)"
                            >
                                Close
                            </button>
                        </div>

                        {navContent}
                    </aside>
                </div>
            )}
        </>
    );
}