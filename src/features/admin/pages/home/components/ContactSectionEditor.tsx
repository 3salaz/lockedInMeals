import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import type { ContactSectionContent } from "@/features/homepage/types/homepageContent.types";
import { storage } from "@/lib/firebase/firebase";

type Props = {
    contact: ContactSectionContent;
    onChange: (contact: ContactSectionContent) => void;
};

const inputClassName =
    "block w-full min-w-0 rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent-soft)";
const textareaClassName =
    "block w-full min-w-0 resize-none rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent-soft)";

export default function ContactSectionEditor({ contact, onChange }: Props) {
    const bgFileRef = useRef<HTMLInputElement | null>(null);
    const [uploadingBg, setUploadingBg] = useState(false);
    const [bgUploadError, setBgUploadError] = useState("");

    async function handleBgUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        setBgUploadError("");
        if (!file.type.startsWith("image/")) { setBgUploadError("Please upload an image file."); return; }
        if (file.size > 10 * 1024 * 1024) { setBgUploadError("Image must be smaller than 10MB."); return; }
        try {
            setUploadingBg(true);
            const ext = file.name.split(".").pop() || "jpg";
            const imageRef = ref(storage, `site-media/homepage/contact/bg-${Date.now()}.${ext}`);
            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);
            update("backgroundImageUrl", downloadUrl);
        } catch (err) {
            console.error(err);
            setBgUploadError("Upload failed. Check Firebase Storage rules.");
        } finally {
            setUploadingBg(false);
            if (bgFileRef.current) bgFileRef.current.value = "";
        }
    }

    function update<K extends keyof ContactSectionContent>(
        key: K,
        value: ContactSectionContent[K],
    ) {
        onChange({ ...contact, [key]: value });
    }

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-6">
            <div className="min-w-0 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent-soft)">
                    Homepage Section
                </p>
                <h2 className="mt-3 text-xl font-semibold text-(--color-text)">Contact</h2>
                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                    Edit the email sign-up section, button labels, and footer text.
                </p>
            </div>

            <div className="mt-6 grid min-w-0 max-w-xl gap-5">
                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Eyebrow</span>
                    <input
                        type="text"
                        value={contact.eyebrow}
                        onChange={(e) => update("eyebrow", e.target.value)}
                        className={inputClassName}
                    />
                </label>

                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Heading</span>
                    <input
                        type="text"
                        value={contact.heading}
                        onChange={(e) => update("heading", e.target.value)}
                        className={inputClassName}
                    />
                </label>

                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Subheading</span>
                    <input
                        type="text"
                        value={contact.subheading}
                        onChange={(e) => update("subheading", e.target.value)}
                        className={inputClassName}
                    />
                </label>

                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Body</span>
                    <textarea
                        value={contact.body}
                        onChange={(e) => update("body", e.target.value)}
                        rows={3}
                        className={textareaClassName}
                    />
                </label>

                <div className="grid min-w-0 grid-cols-2 gap-5">
                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Email Placeholder
                        </span>
                        <input
                            type="text"
                            value={contact.emailPlaceholder}
                            onChange={(e) => update("emailPlaceholder", e.target.value)}
                            className={inputClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Submit Label
                        </span>
                        <input
                            type="text"
                            value={contact.submitLabel}
                            onChange={(e) => update("submitLabel", e.target.value)}
                            className={inputClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            Submitting Label
                        </span>
                        <input
                            type="text"
                            value={contact.submittingLabel}
                            onChange={(e) => update("submittingLabel", e.target.value)}
                            className={inputClassName}
                        />
                    </label>
                </div>

                <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                    <p className="mb-4 text-sm font-medium text-(--color-text)">
                        Social Links{" "}
                        <span className="font-normal text-(--color-text-muted)">(optional — leave blank to hide)</span>
                    </p>

                    <div className="space-y-4">
                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">Gmail / Email</span>
                            <input
                                type="text"
                                placeholder="mailto:you@gmail.com"
                                value={contact.socialLinks?.gmail ?? ""}
                                onChange={(e) =>
                                    update("socialLinks", {
                                        ...contact.socialLinks,
                                        gmail: e.target.value || undefined,
                                    })
                                }
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">Instagram</span>
                            <input
                                type="text"
                                placeholder="https://instagram.com/yourhandle"
                                value={contact.socialLinks?.instagram ?? ""}
                                onChange={(e) =>
                                    update("socialLinks", {
                                        ...contact.socialLinks,
                                        instagram: e.target.value || undefined,
                                    })
                                }
                                className={inputClassName}
                            />
                        </label>

                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm text-(--color-text-muted)">Facebook</span>
                            <input
                                type="text"
                                placeholder="https://facebook.com/yourpage"
                                value={contact.socialLinks?.facebook ?? ""}
                                onChange={(e) =>
                                    update("socialLinks", {
                                        ...contact.socialLinks,
                                        facebook: e.target.value || undefined,
                                    })
                                }
                                className={inputClassName}
                            />
                        </label>
                    </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-(--color-text)">Background Image</p>
                            <p className="mt-1 text-sm text-(--color-text-muted)">
                                Shown in the top 45% of the section. Leave blank for none.
                            </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <input
                                ref={bgFileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleBgUpload}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => bgFileRef.current?.click()}
                                disabled={uploadingBg}
                                className="rounded-xl bg-(--color-accent-soft) px-4 py-2 text-sm font-medium text-(--color-background) transition disabled:opacity-60"
                            >
                                {uploadingBg ? "Uploading..." : "Upload Image"}
                            </button>
                        </div>
                    </div>

                    {bgUploadError && (
                        <p className="mt-3 text-sm text-red-400">{bgUploadError}</p>
                    )}

                    <label className="mt-4 block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">Image URL</span>
                        <input
                            type="text"
                            value={contact.backgroundImageUrl ?? ""}
                            onChange={(e) => update("backgroundImageUrl", e.target.value || undefined)}
                            className={inputClassName}
                        />
                    </label>

                    {contact.backgroundImageUrl && (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-(--color-border)">
                            <img
                                src={contact.backgroundImageUrl}
                                alt="Contact background preview"
                                className="h-32 w-full object-cover object-top"
                            />
                        </div>
                    )}
                </div>

                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">Footer Text</span>
                    <input
                        type="text"
                        value={contact.footerText}
                        onChange={(e) => update("footerText", e.target.value)}
                        className={inputClassName}
                    />
                </label>
            </div>
        </div>
    );
}
