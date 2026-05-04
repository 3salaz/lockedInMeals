import { Outlet } from "react-router-dom";

import DashboardSidebar from "@/features/admin/dashboard/components/DashboardSidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-(--color-background) text-(--color-text)">
            <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
                <DashboardSidebar />

                <main className="min-w-0 px-5 py-6 md:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}