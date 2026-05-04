import { Route } from "react-router-dom";

import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminProtectedRoute from "@/features/admin/components/AdminProtectedRoute";
import AdminLoginPage from "@/features/admin/auth/pages/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/dashboard/pages/AdminDashboardPage";
import AdminThemePage from "@/features/admin/theme/pages/AdminThemePage";
import AdminHomePageEditor from "@/features/admin/pages/home/pages/AdminHomePageEditor";

export function AdminRoutes() {
    return (
        <>
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route element={<AdminProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/theme" element={<AdminThemePage />} />
                    <Route path="/admin/pages/home" element={<AdminHomePageEditor />} />
                </Route>
            </Route>
        </>
    );
}