type ThemeColorInputProps = {
    label: string;
    value: string;
    isInvalid?: boolean;
    onChange: (value: string) => void;
};

export default function ThemeColorInput({
    label,
    value,
    isInvalid = false,
    onChange,
}: ThemeColorInputProps) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm text-[var(--preview-color-text-muted,var(--color-text-muted))]">
                {label}
            </span>

            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={value.startsWith("#") ? value : "#000000"}
                    onChange={(event) => onChange(event.target.value)}
                    className={[
                        "h-11 w-14 cursor-pointer rounded-lg border bg-transparent",
                        isInvalid
                            ? "border-red-400"
                            : "border-[var(--preview-color-border,var(--color-border))]",
                    ].join(" ")}
                />

                <input
                    type="text"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={[
                        "w-full rounded-xl border bg-[var(--preview-color-surface-muted,var(--color-surface-muted))] px-4 py-3 text-sm text-[var(--preview-color-text,var(--color-text))] outline-none",
                        isInvalid
                            ? "border-red-400 focus:border-red-400"
                            : "border-[var(--preview-color-border,var(--color-border))] focus:border-[var(--preview-color-accent,var(--color-accent))]",
                    ].join(" ")}
                />
            </div>

            {isInvalid && (
                <p className="mt-2 text-xs text-red-300">
                    Enter a valid color like #D8C3A5, #fff, rgb(216, 195, 165), or
                    rgba(216, 195, 165, 0.8).
                </p>
            )}
        </label>
    );
}