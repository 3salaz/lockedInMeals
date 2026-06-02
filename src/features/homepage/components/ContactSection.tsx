import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import SectionFrame from "@/components/layout/SectionFrame";
import { signupForUpdates } from "@/lib/signup";
import type { ContactSectionContent } from "@/features/homepage/types/homepageContent.types";

type ContactSectionProps = {
    content: ContactSectionContent;
    snap?: boolean;
};

export default function ContactSection({
    content,
    snap = true,
}: ContactSectionProps) {
    const [signupEmail, setSignupEmail] = useState("");
    const [signupStatus, setSignupStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [signupMessage, setSignupMessage] = useState("");

    const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setSignupStatus("loading");
            setSignupMessage("");

            const result = await signupForUpdates(signupEmail);

            setSignupStatus("success");
            setSignupMessage(result.message);
            setSignupEmail("");
        } catch (error) {
            setSignupStatus("error");

            const message =
                error instanceof Error && error.message.includes("permission")
                    ? "This email may already be on the list."
                    : "Something went wrong. Please try again.";

            setSignupMessage(message);
        }
    };

    return (
        <SectionFrame
            id={content.id}
            snap={snap}
            maxWidth="5xl"
            className="min-h-svh"
            contentClassName="flex-col items-stretch pt-16 sm:pt-24"
            background={
                <>
                    {/* Background image — top 45%, slow drift animation */}
                    {content.backgroundImageUrl && (
                        <div className="absolute inset-x-0 top-0 h-[45%] overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute inset-0 rounded-b-4xl bg-cover bg-top"
                                style={{ backgroundImage: `url(${content.backgroundImageUrl})`, scale: 1.1 }}
                                animate={{
                                    x: [0, 18, -12, 8, -18, 0],
                                    y: [0, -10, 14, -8, 10, 0],
                                }}
                                transition={{
                                    duration: 35,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }}
                            />
                        </div>
                    )}

                    <div
                        className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent) 14%, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-10 -right-16 h-56 w-56 rounded-full blur-3xl"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--color-accent-soft) 14%, transparent)",
                        }}
                    />
                </>
            }
        >
            <div className="flex flex-1 items-center">
                <motion.div
                    initial={{ y: 10, scale: 0.995 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mx-auto w-full rounded-4xl border border-(--color-border) p-5 text-center shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-10"
                    style={{
                        background:
                            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 20%, transparent), color-mix(in srgb, var(--color-surface) 92%, transparent), transparent)",
                    }}
                >
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-(--color-accent-soft) sm:mb-4 sm:text-xs">
                        {content.eyebrow}
                    </p>

                    <h2 className="mx-auto max-w-2xl text-4xl leading-none font-semibold text-(--color-text) sm:text-5xl lg:text-6xl">
                        {content.heading}
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-(--color-text) sm:mt-4 sm:text-xl sm:leading-8">
                        {content.subheading}
                    </p>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-(--color-text-muted) sm:mt-4 sm:text-base sm:leading-8">
                        {content.body}
                    </p>

                    <form
                        onSubmit={handleSignupSubmit}
                        className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:mt-8 sm:flex-row"
                    >
                        <input
                            type="email"
                            required
                            value={signupEmail}
                            onChange={(event) => setSignupEmail(event.target.value)}
                            placeholder={content.emailPlaceholder}
                            disabled={signupStatus === "loading"}
                            className="min-h-12 flex-1 rounded-full border border-(--color-border) bg-(--color-surface) px-5 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-accent) focus:bg-(--color-surface-muted) disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <motion.button
                            type="submit"
                            disabled={signupStatus === "loading"}
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: signupStatus === "loading" ? 1 : 1.02 }}
                            transition={{ type: "spring", stiffness: 420, damping: 18 }}
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-accent-soft) px-6 py-3 text-sm font-semibold text-(--color-background) shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {signupStatus === "loading"
                                ? content.submittingLabel
                                : content.submitLabel}
                        </motion.button>
                    </form>

                    {signupMessage && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={[
                                "mx-auto mt-4 max-w-xl rounded-full px-4 py-2 text-sm",
                                signupStatus === "success"
                                    ? "border border-green-300/20 bg-green-300/10 text-green-300"
                                    : signupStatus === "error"
                                        ? "border border-red-300/20 bg-red-300/10 text-red-200"
                                        : "text-(--color-text-muted)",
                            ].join(" ")}
                        >
                            {signupMessage}
                        </motion.p>
                    )}

                    {content.socialLinks && (
                        <div className="mt-6 flex items-center justify-center gap-4">
                            {content.socialLinks.gmail && (
                                <motion.a
                                    href={content.socialLinks.gmail}
                                    aria-label="Email us"
                                    whileTap={{ scale: 0.92 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) transition hover:border-(--color-accent-soft) hover:text-(--color-accent-soft)"
                                >
                                    <SiGmail size={20} />
                                </motion.a>
                            )}
                            {content.socialLinks.instagram && (
                                <motion.a
                                    href={content.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    whileTap={{ scale: 0.92 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) transition hover:border-(--color-accent-soft) hover:text-(--color-accent-soft)"
                                >
                                    <FaInstagram size={20} />
                                </motion.a>
                            )}
                            {content.socialLinks.facebook && (
                                <motion.a
                                    href={content.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    whileTap={{ scale: 0.92 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text-muted) transition hover:border-(--color-accent-soft) hover:text-(--color-accent-soft)"
                                >
                                    <FaFacebook size={20} />
                                </motion.a>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            <footer className="shrink-0 border-t border-(--color-border) pt-4 text-center sm:pt-5">
                <p className="text-xs text-(--color-text-muted) sm:text-sm">
                    {content.footerText}
                </p>
            </footer>
        </SectionFrame>
    );
}