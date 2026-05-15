import DashboardCard from "../components/DashboardCard";
import DashboardHeader from "../components/DashboardHeader";

import { clientConfig } from "@/config/clientConfig";

export default function AdminDashboardPage() {
    return (
        <section className="text-(--color-text)">
            <DashboardHeader />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <DashboardCard
                    title="Website"
                    value="Live"
                    description={clientConfig.domain || "yourwebsite.com"}
                    href={`https://${clientConfig.domain}`}
                    actionLabel="Visit Site"
                    status="success"
                />

                <DashboardCard
                    title="Current Plan"
                    value="Growth"
                    description="CMS, Weekly Menu, Theme Management"
                    status="draft"
                />

                <DashboardCard
                    title="Weekly Menu"
                    value="Published"
                    description="12 meals currently active"
                    href="/admin/weekly-menu"
                    actionLabel="Manage Menu"
                    status="success"
                />

                <DashboardCard
                    title="Homepage CMS"
                    value="Ready"
                    description="Edit homepage sections, images, and content"
                    href="/admin/pages/home"
                    actionLabel="Edit Homepage"
                    status="warning"
                />
            </div>

            <div className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
                <h2 className="text-xl font-semibold text-(--color-text)">
                    Next build priorities
                </h2>

                <div className="mt-5 space-y-3 text-sm text-(--color-text-muted)">
                    <p>1. Add homepage content editor.</p>
                    <p>2. Add experiences management.</p>
                    <p>3. Add partner/logo management.</p>
                    <p>4. Add image upload support through Firebase Storage.</p>
                </div>
            </div>
        </section>

    );
}