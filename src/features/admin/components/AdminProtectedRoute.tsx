import { Navigate, Outlet } from "react-router-dom";

import { useAdminAuth } from "@/features/admin/auth/hooks/useAdminAuth";

export default function AdminProtectedRoute() {
    const { adminUser, loadingAdmin } = useAdminAuth();

    if (loadingAdmin) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-[#F8F6F2]">
                <p className="text-sm uppercase tracking-[0.35em] text-[#D8C3A5]">
                    Checking Admin Access
                </p>
            </main>
        );
    }

    if (!adminUser) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}