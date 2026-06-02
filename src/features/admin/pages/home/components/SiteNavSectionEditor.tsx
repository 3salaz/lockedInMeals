import { Plus, Trash2 } from "lucide-react";
import type { HomepageNavContent } from "@/features/homepage/types/homepageContent.types";

type Props = {
    nav: HomepageNavContent;
    onChange: (nav: HomepageNavContent) => void;
};

const inputClassName =
    "block w-full min-w-0 rounded-xl border border-(--color-border) bg-(--color-surface-muted) px-4 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-accent-soft)";

export default function SiteNavSectionEditor({ nav, onChange }: Props) {
    function updateLink(index: number, field: "label" | "href", value: string) {
        onChange({
            ...nav,
            links: nav.links.map((link, i) =>
                i === index ? { ...link, [field]: value } : link,
            ),
        });
    }

    function addLink() {
        onChange({ ...nav, links: [...nav.links, { label: "", href: "#" }] });
    }

    function removeLink(index: number) {
        onChange({ ...nav, links: nav.links.filter((_, i) => i !== index) });
    }

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-6">
            <div className="min-w-0 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent-soft)">
                    Homepage Section
                </p>
                <h2 className="mt-3 text-xl font-semibold text-(--color-text)">
                    Site Navigation
                </h2>
                <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                    Edit the brand label, navigation links, and primary call-to-action.
                </p>
            </div>

            <div className="mt-6 grid min-w-0 max-w-xl gap-5">
                <label className="block min-w-0">
                    <span className="mb-2 block text-sm text-(--color-text-muted)">
                        Brand Label
                    </span>
                    <input
                        type="text"
                        value={nav.brandLabel}
                        onChange={(e) => onChange({ ...nav, brandLabel: e.target.value })}
                        className={inputClassName}
                    />
                </label>

                <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-(--color-text-muted)">Nav Links</span>
                        <button
                            type="button"
                            onClick={addLink}
                            className="flex items-center gap-1 rounded-full border border-(--color-border) bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-muted) transition hover:bg-(--color-surface)"
                        >
                            <Plus size={12} />
                            Add Link
                        </button>
                    </div>

                    <div className="space-y-2">
                        {nav.links.map((link, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={link.label}
                                    placeholder="Label"
                                    onChange={(e) => updateLink(index, "label", e.target.value)}
                                    className={inputClassName + " flex-1"}
                                />
                                <input
                                    type="text"
                                    value={link.href}
                                    placeholder="#section"
                                    onChange={(e) => updateLink(index, "href", e.target.value)}
                                    className={inputClassName + " flex-1"}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeLink(index)}
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface-muted) text-(--color-text-muted) transition hover:text-red-400"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        {nav.links.length === 0 && (
                            <p className="rounded-xl border border-(--color-border) px-4 py-3 text-sm text-(--color-text-muted)">
                                No links yet. Add one above.
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-5">
                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            CTA Button Label
                        </span>
                        <input
                            type="text"
                            value={nav.ctaLabel}
                            onChange={(e) => onChange({ ...nav, ctaLabel: e.target.value })}
                            className={inputClassName}
                        />
                    </label>

                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm text-(--color-text-muted)">
                            CTA Button Link
                        </span>
                        <input
                            type="text"
                            value={nav.ctaHref}
                            onChange={(e) => onChange({ ...nav, ctaHref: e.target.value })}
                            className={inputClassName}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
