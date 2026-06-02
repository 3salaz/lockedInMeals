import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/features/homepage/pages/HomePage";
import { AdminRoutes } from "@/routes/AdminRoutes";

type AppRoutesProps = {
    loadingTheme: boolean;
};

export default function AppRoutes({ loadingTheme }: AppRoutesProps) {
    return (
        <Routes>
            <Route path="/" element={<HomePage loadingTheme={loadingTheme} />} />

            {AdminRoutes()}

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}