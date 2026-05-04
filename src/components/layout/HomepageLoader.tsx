// src/components/layout/HomepageLoader.tsx

export default function HomepageLoader() {
    return (
        <main className="h-dvh overflow-hidden bg-(--color-background) text-(--color-text)">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8 lg:px-10">
                <div className="mb-8 h-10 w-40 animate-pulse rounded-full bg-(--color-surface-muted)" />

                <div className="space-y-4">
                    <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-(--color-surface-muted)" />
                    <div className="h-12 w-10/12 max-w-2xl animate-pulse rounded-2xl bg-(--color-surface-muted)" />
                    <div className="h-12 w-8/12 max-w-xl animate-pulse rounded-2xl bg-(--color-surface-muted)" />
                </div>

                <div className="mt-6 space-y-3">
                    <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-(--color-surface-muted)" />
                    <div className="h-4 w-11/12 max-w-xl animate-pulse rounded-full bg-(--color-surface-muted)" />
                </div>

                <div className="mt-8 flex gap-4">
                    <div className="h-12 w-40 animate-pulse rounded-full bg-(--color-surface-muted)" />
                    <div className="h-12 w-36 animate-pulse rounded-full bg-(--color-surface-muted)" />
                </div>
            </div>
        </main>
    );
}