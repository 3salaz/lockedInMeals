import defaultHeroImage from "@/assets/hero.png";
import defaultFeaturedStoryImage from "@/assets/hero.png";

import type { HomepageContent } from "../types/homepageContent.types";

export const defaultHomepageContent: HomepageContent = {
    id: "homepage",

    nav: {
        brandLabel: "Your Brand",
        links: [
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact" },
        ],
        ctaLabel: "Get Started",
        ctaHref: "#contact",
    },

    hero: {
        eyebrow: "Your Brand · Your Services · Your Story",
        heading: "A modern website built to showcase your business",
        body: "Use this section to introduce your business and guide visitors toward the next action.",
        primaryCtaLabel: "Get Started",
        primaryCtaHref: "#contact",
        secondaryCtaLabel: "Learn More",
        secondaryCtaHref: "#about",
        heroImageUrl: defaultHeroImage,
        highlights: ["Core service", "Customer benefit", "Local expertise", "Easy next step"],
    },

    featureStory: {
        id: "about",
        eyebrow: "About The Brand",
        heading: "Tell visitors what makes this business worth choosing.",
        body: [
            "Use this section to explain the heart of the business, the problem it solves, and why customers should trust it.",
            "Keep the message clear, specific, and focused on the customer experience.",
        ],
        buttonLabel: "Read More",
        imageUrl: defaultFeaturedStoryImage,
        imageAlt: "Business story image",
        imageBadgeEyebrow: "Built With Purpose",
        imageBadgeBody:
            "Use this short highlight to reinforce the main message or customer benefit.",
        modalEyebrow: "About The Brand",
        modalHeading: "A deeper story about the business and its purpose.",
        modalBody: [
            "Use this expanded section to share more background, mission, values, or details that do not need to crowd the main page.",
            "This content should help visitors understand why the business exists and what makes it different.",
            "For clients who do not need a modal, leave the button label or modal content empty in the CMS.",
        ],
    },

    featureCards: {
        id: "services",
        eyebrow: "Services",
        heading: "Showcase the main things this business offers.",
        body: "Use these cards to highlight services, benefits, packages, or key reasons customers should choose this business.",
        items: [
            {
                icon: "utensils",
                title: "Main Offering",
                text: "Describe the primary service or product customers can expect from this business.",
            },
            {
                icon: "calendar",
                title: "Simple Process",
                text: "Explain how the business makes the customer experience easier or more convenient.",
            },
            {
                icon: "users",
                title: "Customer Focused",
                text: "Highlight the audience this business serves and the value it provides.",
            },
            {
                icon: "leaf",
                title: "Built With Care",
                text: "Use this card to reinforce quality, trust, consistency, or another key brand promise.",
            },
        ],
    },
    communityCards: {
        id: "community",
        eyebrow: "Get Connected",
        heading: "Give visitors a reason to take the next step.",
        body: "Use this section to highlight updates, access, community, perks, or another reason customers should stay connected.",
        align: "left",
        ctaLabel: "Get Started",
        ctaHref: "#contact",
        items: [
            {
                icon: "mail",
                title: "Updates",
                text: "Share how customers can stay informed about new offers, announcements, or important business updates.",
            },
            {
                icon: "ticket",
                title: "Access",
                text: "Highlight any special access, booking opportunities, memberships, or customer benefits.",
            },
            {
                icon: "sparkles",
                title: "Extras",
                text: "Use this card for added value, behind-the-scenes content, bonuses, or premium experiences.",
            },
            {
                icon: "users",
                title: "Community",
                text: "Explain how customers can connect with the brand, team, or broader customer community.",
            },
        ],
    },
    businessCards: {
        id: "who-its-for",
        eyebrow: "Who It’s For",
        heading: "Built for people who want food handled without falling off track.",
        body: "Locked In Meals is designed for busy people who want structure, convenience, and consistency.",
        align: "left",
        columns: 3,
        ctaLabel: "Order Meals",
        ctaHref: "#contact",
        items: [
            { icon: "dumbbell", title: "Gym & Fitness Goals" },
            { icon: "calendar", title: "Busy Work Weeks" },
            { icon: "users", title: "Families & Professionals" },
            { icon: "utensils", title: "Clean Eating" },
            { icon: "truck", title: "Convenient Delivery" },
            { icon: "leaf", title: "Better Routine" },
        ],
    },

    contact: {
        id: "contact",
        eyebrow: "Get Started",
        heading: "Ready to take the next step?",
        subheading: "Let’s make it easy to connect.",
        body: "Enter your email for updates, questions, bookings, or next steps.",
        emailPlaceholder: "Enter your email",
        submitLabel: "Submit",
        submittingLabel: "Submitting...",
        secondaryCtaLabel: "Contact Us",
        secondaryCtaHref: "mailto:hello@example.com",
        footerText: "© 2026 Your Brand. All rights reserved.",
    },

};