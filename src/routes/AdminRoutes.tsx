import { Route } from "react-router-dom";

import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminProtectedRoute from "@/features/admin/components/AdminProtectedRoute";
import AdminLoginPage from "@/features/admin/auth/pages/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/dashboard/pages/AdminDashboardPage";
import AdminThemePage from "@/features/admin/theme/pages/AdminThemePage";
import HomePageEditor from "@/features/admin/pages/home/pages/HomePageEditor";
import AdminMealsPage from "@/features/admin/meals/pages/AdminMealsPage";
import AdminWeeklyMenuPage from "@/features/admin/weeklyMenu/pages/AdminWeeklyMenuPage";

export function AdminRoutes() {
    return (
        <>
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route element={<AdminProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/theme" element={<AdminThemePage />} />
                    <Route path="/admin/cms/home" element={<HomePageEditor />} />
                    <Route path="/admin/meals" element={<AdminMealsPage />} />
                    <Route path="admin/weekly-menu" element={<AdminWeeklyMenuPage />} />
                </Route>
            </Route>
        </>
    );
}