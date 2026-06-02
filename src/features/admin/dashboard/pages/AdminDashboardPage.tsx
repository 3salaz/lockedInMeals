import { useState } from "react";

import DashboardCard from "../components/DashboardCard";
import DashboardHeader from "../components/DashboardHeader";
import { seedDemoData } from "@/features/admin/seeds/adminSeedData";
import { clientConfig } from "@/config/clientConfig";

export default function AdminDashboardPage() {
    const [seeding, setSeeding] = useState(false);
    const [seedMessage, setSeedMessage] = useState("");

    async function handleSeed() {
        try {
            setSeeding(true);
            setSeedMessage("");
            await seedDemoData();
            setSeedMessage("Demo data seeded — 6 meals + published weekly menu for June 2.");
        } catch (error) {
            setSeedMessage(error instanceof Error ? error.message : "Seed failed.");
        } finally {
            setSeeding(false);
        }
    }

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

            <div className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-surface) p-6">
                <h2 className="text-xl font-semibold text-(--color-text)">
                    Demo Data
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                    Seed Firestore with 6 sample meals and a published weekly menu for June 2–8.
                    Uses fixed document IDs — safe to run multiple times.
                </p>

                {seedMessage && (
                    <p className="mt-4 rounded-2xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--color-accent-soft)">
                        {seedMessage}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => void handleSeed()}
                    disabled={seeding}
                    className="mt-5 rounded-full bg-(--color-accent-soft) px-5 py-3 text-sm font-semibold text-(--color-background) transition hover:scale-[1.02] disabled:opacity-60"
                >
                    {seeding ? "Seeding..." : "Seed Demo Data"}
                </button>
            </div>
        </section>

    );
}