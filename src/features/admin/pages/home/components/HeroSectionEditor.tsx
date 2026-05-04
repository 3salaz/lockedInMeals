import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import HeroSection from "@/features/homepage/components/HeroSection";
import type { HomepageHeroContent } from "@/features/homepage/types/homepageContent.types";
import { storage } from "@/lib/firebase/firebase";

type HeroSectionEditorProps = {
    hero: HomepageHeroContent;
    onChange: (hero: HomepageHeroContent) => void;
};

type PreviewViewport = "mobile" | "tablet" | "desktop";

const previewViewports: Record<
    PreviewViewport,
    {
        label: string;
        width: number;
        height: number;
        helperText: string;
    }
> = {
    mobile: {
        label: "Mobile",
        width: 390,
        height: 720,
        helperText: "390px preview",
    },
    tablet: {
        label: "Tablet",
        width: 768,
        height: 720,
        helperText: "768px preview",
    },
    desktop: {
        label: "Desktop",
        width: 1180,
        height: 720,
        helperText: "1180px preview scaled to fit",
    },
};

export default function HeroSectionEditor({
    hero,
    onChange,
}: HeroSectionEditorProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const previewContainerRef = useRef<HTMLDivElement | null>(null);

    // const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploadError, setImageUploadError] = useState("");
    const [previewViewport, setPreviewViewport] =
        useState<PreviewViewport>("mobile");
    const [previewScale, setPreviewScale] = useState(1);

    const activeViewport = previewViewports[previewViewport];

    useEffect(() => {
        function updatePreviewScale() {
            const container = previewContainerRef.current;

            if (!container) return;

            const availableWidth = container.clientWidth;
            const nextScale = Math.min(1, availableWidth / activeViewport.width);

            setPreviewScale(nextScale);
        }

        updatePreviewScale();

        const container = previewContainerRef.current;

        if (!container) return;

        const resizeObserver = new ResizeObserver(updatePreviewScale);
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [activeViewport.width]);

    function updateHeroField<Key extends keyof HomepageHeroContent>(
        key: Key,
        value: HomepageHeroContent[Key],
    ) {
        onChange({
            ...hero,
            [key]: value,
        });
    }

    async function handleHeroImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        setImageUploadError("");

        const isImage = file.type.startsWith("image/");
        const maxFileSize = 5 * 1024 * 1024;

        if (!isImage) {
            setImageUploadError("Please upload an image file.");
            return;
        }

        if (file.size > maxFileSize) {
            setImageUploadError("Image must be smaller than 5MB.");
            return;
        }

        try {
            // setUploadingImage(true);

            const fileExtension = file.name.split(".").pop() || "jpg";
            const safeFileName = `hero-${Date.now()}.${fileExtension}`;
            const storagePath = `site-media/homepage/hero/${safeFileName}`;
            const imageRef = ref(storage, storagePath);

            await uploadBytes(imageRef, file);

            const downloadUrl = await getDownloadURL(imageRef);

            updateHeroField("heroImageUrl", downloadUrl);
        } catch (error) {
            console.error("Failed to upload hero image:", error);
            setImageUploadError("Failed to upload image. Please try again.");
        } finally {
            // setUploadingImage(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }

    const inputClassName =
        "block w-full min-w-0 max-w-full rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent)";

    const textareaClassName =
        "block w-full min-w-0 max-w-full resize-none rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent)";

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-6">
            <div className="min-w-0 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent)">
                    Homepage Section
                </p>

                <h2 className="mt-3 text-xl font-semibold text-(--color-text)">
                    Hero
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                    Edit the first section visitors see when they land on the website.
                </p>
            </div>

            <div className="mt-6 grid min-w-0 gap-8 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:items-start">
                <div className="grid min-w-0 gap-5">
                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Eyebrow
                        </span>

                        <input
                            type="text"
                            value={hero.eyebrow}
                            onChange={(event) =>
                                updateHeroField("eyebrow", event.target.value)
                            }
                            className={inputClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Heading
                        </span>

                        <textarea
                            value={hero.heading}
                            onChange={(event) =>
                                updateHeroField("heading", event.target.value)
                            }
                            rows={3}
                            className={textareaClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Body
                        </span>

                        <textarea
                            value={hero.body}
                            onChange={(event) => updateHeroField("body", event.target.value)}
                            rows={4}
                            className={textareaClassName}
                        />
                    </label>

                    <div className="grid min-w-0 gap-5 md:grid-cols-2">
                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Primary Button Label
                            </span>

                            <input
                                type="text"
                                value={hero.primaryCtaLabel}
                                onChange={(event) =>
                                    updateHeroField("primaryCtaLabel", event.target.value)
                                }
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Primary Button Link
                            </span>

                            <input
                                type="text"
                                value={hero.primaryCtaHref}
                                onChange={(event) =>
                                    updateHeroField("primaryCtaHref", event.target.value)
                                }
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Secondary Button Label
                            </span>

                            <input
                                type="text"
                                value={hero.secondaryCtaLabel}
                                onChange={(event) =>
                                    updateHeroField("secondaryCtaLabel", event.target.value)
                                }
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Secondary Button Link
                            </span>

                            <input
                                type="text"
                                value={hero.secondaryCtaHref}
                                onChange={(event) =>
                                    updateHeroField("secondaryCtaHref", event.target.value)
                                }
                                className={inputClassName}
                            />
                        </label>
                    </div>

                    <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-(--color-text)">
                                    Hero Image
                                </p>

                                <p className="mt-1 text-sm leading-6 text-(--color-text-muted)">
                                    Upload a new image or paste an image URL below.
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleHeroImageUpload}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    disabled
                                    className="rounded-xl border border-(--color-border) bg-(--color-accent-soft) px-5 py-3 text-sm text-(--color-text-muted) opacity-90"
                                >
                                    Upload Image Coming Soon
                                </button>
                            </div>
                        </div>

                        {imageUploadError && (
                            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                {imageUploadError}
                            </p>
                        )}

                        <label className="mt-5 block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">
                                Hero Image URL
                            </span>

                            <input
                                type="text"
                                value={hero.heroImageUrl}
                                onChange={(event) =>
                                    updateHeroField("heroImageUrl", event.target.value)
                                }
                                className={inputClassName}
                            />
                        </label>

                        {hero.heroImageUrl && (
                            <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border)">
                                <img
                                    src={hero.heroImageUrl}
                                    alt="Hero preview"
                                    className="h-56 w-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-w-0 xl:sticky xl:top-8">
                    <div className="mb-4 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent)">
                                Live Section Preview
                            </p>

                            <p className="mt-2 text-sm text-(--color-text-muted)">
                                Preview how this section looks across common device widths.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(previewViewports) as PreviewViewport[]).map(
                                (viewport) => {
                                    const isActive = previewViewport === viewport;

                                    return (
                                        <button
                                            key={viewport}
                                            type="button"
                                            onClick={() => setPreviewViewport(viewport)}
                                            className={[
                                                "rounded-full border px-3 py-2 text-xs font-medium transition",
                                                isActive
                                                    ? "border-(--color-accent) bg-(--color-accent) text-(--color-background)"
                                                    : "border-(--color-border) bg-(--color-surface-muted) text-(--color-text-muted) hover:text-(--color-text)",
                                            ].join(" ")}
                                        >
                                            {previewViewports[viewport].label}
                                        </button>
                                    );
                                },
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-(--color-border) bg-(--color-surface-muted) p-3">
                        <div className="mb-3 flex items-center justify-between gap-3 px-1">
                            <p className="text-xs text-(--color-text-muted)">
                                {activeViewport.helperText}
                            </p>

                            <p className="text-xs text-(--color-text-muted)">
                                Scale: {Math.round(previewScale * 100)}%
                            </p>
                        </div>

                        <div
                            ref={previewContainerRef}
                            className="max-w-full overflow-hidden rounded-2xl"
                        >
                            <div
                                className="mx-auto"
                                style={{
                                    width: activeViewport.width * previewScale,
                                    height: activeViewport.height * previewScale,
                                }}
                            >
                                <div
                                    className="origin-top-left overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-background)"
                                    style={{
                                        width: activeViewport.width,
                                        height: activeViewport.height,
                                        transform: `scale(${previewScale})`,
                                    }}
                                >
                                    <HeroSection
                                        hero={hero}
                                        compact
                                        previewMode={previewViewport}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}