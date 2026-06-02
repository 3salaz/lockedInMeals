import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Plus, Trash2 } from "lucide-react";

import type { FeatureStoryContent } from "@/features/homepage/types/homepageContent.types";
import { storage } from "@/lib/firebase/firebase";

type Props = {
    featureStory: FeatureStoryContent;
    onChange: (featureStory: FeatureStoryContent) => void;
};

const inputClassName =
    "block w-full min-w-0 rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent-soft)";
const textareaClassName =
    "block w-full min-w-0 resize-none rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent-soft)";

export default function FeaturedStorySectionEditor({ featureStory, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    function update<K extends keyof FeatureStoryContent>(key: K, value: FeatureStoryContent[K]) {
        onChange({ ...featureStory, [key]: value });
    }

    function updateBodyParagraph(index: number, value: string) {
        update("body", featureStory.body.map((p, i) => (i === index ? value : p)));
    }

    function addBodyParagraph() {
        update("body", [...featureStory.body, ""]);
    }

    function removeBodyParagraph(index: number) {
        update("body", featureStory.body.filter((_, i) => i !== index));
    }

    function updateModalParagraph(index: number, value: string) {
        update("modalBody", (featureStory.modalBody ?? []).map((p, i) => (i === index ? value : p)));
    }

    function addModalParagraph() {
        update("modalBody", [...(featureStory.modalBody ?? []), ""]);
    }

    function removeModalParagraph(index: number) {
        update("modalBody", (featureStory.modalBody ?? []).filter((_, i) => i !== index));
    }

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadError("");

        if (!file.type.startsWith("image/")) {
            setUploadError("Please upload an image file.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setUploadError("Image must be smaller than 10MB.");
            return;
        }

        try {
            setUploading(true);
            const ext = file.name.split(".").pop() || "jpg";
            const imageRef = ref(
                storage,
                `site-media/homepage/featured-story/story-${Date.now()}.${ext}`,
            );
            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);
            update("imageUrl", downloadUrl);
        } catch (err) {
            console.error("Featured story image upload failed:", err);
            setUploadError("Failed to upload image. Check Firebase Storage rules.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-6">
            <div className="min-w-0 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent-soft)">
                    Homepage Section
                </p>
                <h2 className="mt-3 text-xl font-semibold text-(--color-text)">
                    Featured Story
                </h2>
                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                    Edit the story section image, text, and optional modal content.
                </p>
            </div>

            <div className="mt-6 grid min-w-0 max-w-xl gap-5">
                {/* Eyebrow */}
                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Eyebrow</span>
                    <input
                        type="text"
                        value={featureStory.eyebrow}
                        onChange={(e) => update("eyebrow", e.target.value)}
                        className={inputClassName}
                    />
                </label>

                {/* Heading */}
                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Heading</span>
                    <textarea
                        value={featureStory.heading}
                        onChange={(e) => update("heading", e.target.value)}
                        rows={2}
                        className={textareaClassName}
                    />
                </label>

                {/* Body paragraphs */}
                <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-(--color-text-muted)">Body Paragraphs</span>
                        <button
                            type="button"
                            onClick={addBodyParagraph}
                            className="flex items-center gap-1 rounded-full border border-(--color-border) bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-muted) transition hover:bg-(--color-surface)"
                        >
                            <Plus size={12} />
                            Add
                        </button>
                    </div>
                    <div className="space-y-2">
                        {featureStory.body.map((paragraph, i) => (
                            <div key={i} className="flex gap-2">
                                <textarea
                                    value={paragraph}
                                    onChange={(e) => updateBodyParagraph(i, e.target.value)}
                                    rows={2}
                                    className={textareaClassName + " flex-1"}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeBodyParagraph(i)}
                                    className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface-muted) text-(--color-text-muted) transition hover:text-red-400"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Read More button label */}
                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">
                        Button Label{" "}
                        <span className="opacity-50">(optional — leave blank to hide button)</span>
                    </span>
                    <input
                        type="text"
                        value={featureStory.buttonLabel ?? ""}
                        onChange={(e) => update("buttonLabel", e.target.value || undefined)}
                        className={inputClassName}
                    />
                </label>

                {/* Image upload */}
                <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-(--color-text)">Story Image</p>
                            <p className="mt-1 text-sm text-(--color-text-muted)">
                                Uploaded to Firebase Storage. URL saved in Firestore.
                            </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="rounded-xl bg-(--color-accent-soft) px-4 py-2 text-sm font-medium text-(--color-background) transition disabled:opacity-60"
                            >
                                {uploading ? "Uploading..." : "Upload Image"}
                            </button>
                        </div>
                    </div>

                    {uploadError && (
                        <p className="mt-3 text-sm text-red-400">{uploadError}</p>
                    )}

                    <label className="mt-4 block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">Image URL</span>
                        <input
                            type="text"
                            value={featureStory.imageUrl}
                            onChange={(e) => update("imageUrl", e.target.value)}
                            className={inputClassName}
                        />
                    </label>

                    <label className="mt-4 block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">Image Alt Text</span>
                        <input
                            type="text"
                            value={featureStory.imageAlt}
                            onChange={(e) => update("imageAlt", e.target.value)}
                            className={inputClassName}
                        />
                    </label>

                    {featureStory.imageUrl && (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-(--color-border)">
                            <img
                                src={featureStory.imageUrl}
                                alt="Story preview"
                                className="h-48 w-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Image badge */}
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Badge Eyebrow{" "}
                            <span className="opacity-50">(optional)</span>
                        </span>
                        <input
                            type="text"
                            value={featureStory.imageBadgeEyebrow ?? ""}
                            onChange={(e) => update("imageBadgeEyebrow", e.target.value || undefined)}
                            className={inputClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Badge Body{" "}
                            <span className="opacity-50">(optional)</span>
                        </span>
                        <input
                            type="text"
                            value={featureStory.imageBadgeBody ?? ""}
                            onChange={(e) => update("imageBadgeBody", e.target.value || undefined)}
                            className={inputClassName}
                        />
                    </label>
                </div>

                {/* Modal content */}
                <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                    <p className="mb-4 text-sm font-medium text-(--color-text)">
                        Modal Content{" "}
                        <span className="font-normal text-(--color-text-muted)">
                            (shown when button is clicked)
                        </span>
                    </p>

                    <div className="space-y-4">
                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Modal Eyebrow{" "}
                                <span className="opacity-50">(optional)</span>
                            </span>
                            <input
                                type="text"
                                value={featureStory.modalEyebrow ?? ""}
                                onChange={(e) => update("modalEyebrow", e.target.value || undefined)}
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Modal Heading{" "}
                                <span className="opacity-50">(optional)</span>
                            </span>
                            <input
                                type="text"
                                value={featureStory.modalHeading ?? ""}
                                onChange={(e) => update("modalHeading", e.target.value || undefined)}
                                className={inputClassName}
                            />
                        </label>

                        <div className="min-w-0">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-(--color-text-muted)">
                                    Modal Paragraphs{" "}
                                    <span className="opacity-50">(optional)</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={addModalParagraph}
                                    className="flex items-center gap-1 rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-xs text-(--color-text-muted) transition hover:bg-(--color-surface-muted)"
                                >
                                    <Plus size={12} />
                                    Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {(featureStory.modalBody ?? []).map((paragraph, i) => (
                                    <div key={i} className="flex gap-2">
                                        <textarea
                                            value={paragraph}
                                            onChange={(e) => updateModalParagraph(i, e.target.value)}
                                            rows={2}
                                            className={textareaClassName + " flex-1"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeModalParagraph(i)}
                                            className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) transition hover:text-red-400"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
