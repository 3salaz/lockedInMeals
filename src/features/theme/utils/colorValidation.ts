export function isValidThemeColor(value: string) {
    const trimmedValue = value.trim();

    const isHex =
        /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmedValue);

    const isRgb =
        /^rgb\(\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*\)$/.test(
            trimmedValue,
        );

    const isRgba =
        /^rgba\(\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
            trimmedValue,
        );

    return isHex || isRgb || isRgba;
}

export function getInvalidThemeColorFields(colors: Record<string, string>) {
    return Object.entries(colors)
        .filter(([, value]) => !isValidThemeColor(value))
        .map(([key]) => key);
}