import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/features/homepage/pages/HomePage";
import { AdminRoutes } from "@/routes/AdminRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {AdminRoutes()}

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}