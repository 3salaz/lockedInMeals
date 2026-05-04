import DashboardCard from "../components/DashboardCard";
import DashboardHeader from "../components/DashboardHeader";

export default function AdminDashboardPage() {
    return (
        <section className="text-(--color-text)">
            <DashboardHeader />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <DashboardCard
                    title="Homepage"
                    value="Live"
                    description="Public-facing brand site currently deployed."
                />

                <DashboardCard
                    title="CMS"
                    value="Pending"
                    description="Content editing tools will be added in the next phase."
                />

                <DashboardCard
                    title="Experiences"
                    value="Draft"
                    description="Wine tastings, private events, and curated services."
                />

                <DashboardCard
                    title="Partners"
                    value="Draft"
                    description="Future partner and collaboration management."
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