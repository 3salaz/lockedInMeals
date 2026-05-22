import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "@/lib/firebase/firebase";

type Props = {
    settings: {
        snapScroll: boolean;

        parallax: {
            enabled: boolean;
            imageUrl: string;
            opacity: number;
        };
    };

    onChange: (settings: {
        snapScroll: boolean;

        parallax: {
            enabled: boolean;
            imageUrl: string;
            opacity: number;
        };
    }) => void;
};

export default function MainSectionEditor({
    settings,
    onChange,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const parallax = settings.parallax ?? {
        enabled: false,
        imageUrl: "",
        opacity: 0.2,
    };

    async function handleParallaxUpload(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        setUploadError("");

        const isImage = file.type.startsWith("image/");
        const maxFileSize = 10 * 1024 * 1024;

        if (!isImage) {
            setUploadError("Please upload an image file.");
            return;
        }

        if (file.size > maxFileSize) {
            setUploadError("Image must be smaller than 10MB.");
            return;
        }

        try {
            setUploading(true);

            const extension = file.name.split(".").pop() || "jpg";

            const fileName = `parallax-${Date.now()}.${extension}`;

            const storagePath =
                `site-media/homepage/parallax/${fileName}`;

            const imageRef = ref(storage, storagePath);

            await uploadBytes(imageRef, file);

            // IMPORTANT:
            // This gives the browser-safe HTTPS URL
            const downloadUrl = await getDownloadURL(imageRef);

            onChange({
                ...settings,

                parallax: {
                    ...parallax,
                    imageUrl: downloadUrl,
                },
            });
        } catch (error) {
            console.error("Parallax upload failed:", error);

            setUploadError(
                "Failed to upload image. Check Firebase Storage rules."
            );
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }

    return (
        <div className="rounded-3xl border border(--color-border) bg-(--color-surface) p-6">
            <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent-soft)">
                    Homepage Layout
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-(--color-text)">
                    Main Settings
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-(--color-text-muted)">
                    Control homepage scrolling and parallax visuals.
                </p>
            </div>

            <div className="space-y-5">
                {/* SNAP SCROLL */}

                <label className="flex items-center justify-between rounded-2xl border border-(--color-border) p-4">
                    <div>
                        <p className="font-medium text-(--color-text)">
                            Snap Scrolling
                        </p>

                        <p className="mt-1 text-sm text-(--color-text-muted)">
                            Sections snap into place while scrolling.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={settings.snapScroll}
                        onChange={(e) =>
                            onChange({
                                ...settings,
                                snapScroll: e.target.checked,
                            })
                        }
                        className="h-5 w-5"
                    />
                </label>

                {/* PARALLAX ENABLE */}

                <label className="flex items-center justify-between rounded-2xl border border-(--color-border) p-4">
                    <div>
                        <p className="font-medium text-(--color-text)">
                            Parallax Background
                        </p>

                        <p className="mt-1 text-sm text-(--color-text-muted)">
                            Adds a cinematic scrolling background image.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={parallax.enabled}
                        onChange={(e) =>
                            onChange({
                                ...settings,

                                parallax: {
                                    ...parallax,
                                    enabled: e.target.checked,
                                },
                            })
                        }
                        className="h-5 w-5"
                    />
                </label>

                {/* IMAGE UPLOAD */}

                <div className="rounded-2xl border border-(--color-border) p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-medium text-(--color-text)">
                                Parallax Image
                            </p>

                            <p className="mt-1 text-sm text-(--color-text-muted)">
                                Upload a vertical artistic background image.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="rounded-xl bg-(--color-accent-soft) px-4 py-2 text-sm font-medium text-(--color-background)"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleParallaxUpload}
                        className="hidden"
                    />

                    {uploadError && (
                        <p className="mt-4 text-sm text-red-400">
                            {uploadError}
                        </p>
                    )}

                    {/* IMAGE URL */}

                    <div className="mt-5">
                        <label className="mb-2 block text-sm text-(--color-text-muted)">
                            Image URL
                        </label>

                        <input
                            type="text"
                            value={parallax.imageUrl}
                            onChange={(e) =>
                                onChange({
                                    ...settings,

                                    parallax: {
                                        ...parallax,
                                        imageUrl: e.target.value,
                                    },
                                })
                            }
                            className="w-full rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm"
                        />
                    </div>

                    {/* OPACITY */}

                    <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm text-(--color-text-muted)">
                                Opacity
                            </label>

                            <span className="text-xs text-(--color-text-muted)">
                                {parallax.opacity}
                            </span>
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={parallax.opacity}
                            onChange={(e) =>
                                onChange({
                                    ...settings,

                                    parallax: {
                                        ...parallax,
                                        opacity: Number(e.target.value),
                                    },
                                })
                            }
                            className="w-full"
                        />
                    </div>

                    {/* PREVIEW */}

                    {parallax.imageUrl && (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-(--color-border)">
                            <img
                                src={parallax.imageUrl}
                                alt="Parallax preview"
                                className="h-72 w-full object-cover"
                                style={{
                                    opacity: parallax.opacity,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}