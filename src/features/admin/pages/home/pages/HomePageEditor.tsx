import { useEffect, useMemo, useState } from "react";
import { useHomepageContent } from "@/features/homepage/hooks/useHomepageContent";

import MainSectionEditor from "../components/MainSelectionEditor";
import HeroSectionEditor from "../components/HeroSectionEditor";

export default function HomePageEditor() {
    const {
        homepageContent,
        setHomepageContent,
        loadingHomepageContent,
        savingHomepageContent,
        homepageContentError,
        saveHomepageContent,
    } = useHomepageContent();

    const [successMessage, setSuccessMessage] = useState("");
    const [savedSnapshot, setSavedSnapshot] = useState("");
    const [selectedSection, setSelectedSection] = useState("hero");

    const currentSnapshot = useMemo(() => {
        return JSON.stringify(homepageContent);
    }, [homepageContent]);

    const hasUnsavedChanges =
        Boolean(savedSnapshot) && currentSnapshot !== savedSnapshot;

    useEffect(() => {
        if (!loadingHomepageContent && !savedSnapshot) {
            setSavedSnapshot(JSON.stringify(homepageContent));
        }
    }, [homepageContent, loadingHomepageContent, savedSnapshot]);

    async function handleSaveHomepage() {
        await saveHomepageContent(homepageContent);
        setSavedSnapshot(JSON.stringify(homepageContent));
        setSuccessMessage("Homepage saved successfully.");
    }

    if (loadingHomepageContent) {
        return (
            <section className="text-(--color-text)">
                <p className="text-sm uppercase tracking-[0.35em] text-(--color-accent-soft)">
                    Loading Homepage Editor
                </p>
            </section>
        );
    }

    const sectionEditors: Record<string, React.ReactNode> = {
        main: (
            <MainSectionEditor
                settings={homepageContent.settings}
                onChange={(settings) => {
                    setSuccessMessage("");

                    setHomepageContent({
                        ...homepageContent,
                        settings,
                    });
                }}
            />
        ),

        hero: (
            <HeroSectionEditor
                hero={homepageContent.hero}
                onChange={(hero) => {
                    setSuccessMessage("");

                    setHomepageContent({
                        ...homepageContent,
                        hero,
                    });
                }}
            />
        ),
    };

    return (
        <section className="text-(--color-text)">
            <header className="mb-8 border-b border-(--color-border) pb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent-soft)">
                            CMS
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold text-(--color-text) md:text-4xl">
                            Homepage Editor
                        </h1>

                        <p className="mt-3 pb-2 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                            Edit the public homepage section by section.
                        </p>

                        <select
                            className="bg-(--color-surface) p-1 px-2 rounded-lg border border-(--color-border)"
                            name="section"
                            id="section-selection"
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                        >
                            <option value="main">Main</option>
                            <option value="siteNav">Site Nav</option>
                            <option value="hero">Hero</option>
                            <option value="experiences">FeaturedStory</option>
                            <option value="wineCrew">Weekly Menu Section</option>
                            <option value="contact">Contact</option>
                        </select>
                    </div>

                    {hasUnsavedChanges && (
                        <p className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs text-(--color-accent-soft)">
                            Unsaved changes
                        </p>
                    )}
                </div>
            </header>

            {homepageContentError && (
                <p className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                    {homepageContentError}
                </p>
            )}

            {successMessage && (
                <p className="mb-6 rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-700">
                    {successMessage}
                </p>
            )}

            <div className="min-w-0 space-y-6">
                {sectionEditors[selectedSection]}

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleSaveHomepage}
                        disabled={savingHomepageContent || !hasUnsavedChanges}
                        className="w-full rounded-xl bg-(--color-accent-soft) px-5 py-3 text-sm font-medium text-(--color-background) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {savingHomepageContent ? "Saving..." : "Save Homepage"}
                    </button>
                </div>
            </div>
        </section>
    );
}