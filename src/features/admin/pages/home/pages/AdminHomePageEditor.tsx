import { useEffect, useMemo, useState } from "react";

import HeroSectionEditor from "../components/HeroSectionEditor";

import { useHomepageContent } from "@/features/homepage/hooks/useHomepageContent";

export default function AdminHomePageEditor() {
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
                <p className="text-sm uppercase tracking-[0.35em] text-(--color-accent)">
                    Loading Homepage Editor
                </p>
            </section>
        );
    }

    return (
        <section className="text-(--color-text)">
            <header className="mb-8 border-b border-(--color-border) pb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-(--color-accent)">
                            Pages
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold text-(--color-text) md:text-4xl">
                            Homepage Editor
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                            Edit the public homepage section by section.
                        </p>
                    </div>

                    {hasUnsavedChanges && (
                        <p className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs text-(--color-accent)">
                            Unsaved changes
                        </p>
                    )}
                </div>
            </header>

            {homepageContentError && (
                <p className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {homepageContentError}
                </p>
            )}

            {successMessage && (
                <p className="mb-6 rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                    {successMessage}
                </p>
            )}

            <div className="min-w-0 space-y-6">
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

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleSaveHomepage}
                        disabled={savingHomepageContent || !hasUnsavedChanges}
                        className="w-full rounded-xl bg-(--color-accent) px-5 py-3 text-sm font-medium text-(--color-background) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {savingHomepageContent ? "Saving..." : "Save Homepage"}
                    </button>
                </div>
            </div>
        </section>
    );
}