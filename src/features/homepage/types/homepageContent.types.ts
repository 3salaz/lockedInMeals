export type HomepageHeroContent = {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    heroImageUrl: string;
    highlights?: string[];
};

export type HomepageNavLink = {
    label: string;
    href: string;
};

export type HomepageNavContent = {
    brandLabel: string;
    links: HomepageNavLink[];
    ctaLabel: string;
    ctaHref: string;
};

// src/features/homepage/types/homepageContent.types.ts

export type FeatureStoryContent = {
    id: string;
    eyebrow: string;
    heading: string;
    body: string[];
    buttonLabel?: string;
    imageUrl: string;
    imageAlt: string;
    imageBadgeEyebrow?: string;
    imageBadgeBody?: string;
    modalEyebrow?: string;
    modalHeading?: string;
    modalBody?: string[];
};

export type FeatureCardsIconKey =
    | "map"
    | "music"
    | "users"
    | "wine"
    | "utensils"
    | "truck"
    | "dumbbell"
    | "calendar"
    | "leaf"
    | "mail"
    | "sparkles"
    | "ticket";

export type FeatureCardsItem = {
    icon: FeatureCardsIconKey;
    title: string;
    text: string;
};

export type FeatureCardsContent = {
    id: string;
    eyebrow: string;
    heading: string;
    body: string;
    align?: "left" | "center";
    ctaLabel?: string;
    ctaHref?: string;
    items: FeatureCardsItem[];
};

export type HomepageContent = {
    id: "homepage";
    nav: HomepageNavContent;
    hero: HomepageHeroContent;
    featureStory: FeatureStoryContent;
    featureCards: FeatureCardsContent;
    communityCards: FeatureCardsContent;
    updatedAt?: Date;
};