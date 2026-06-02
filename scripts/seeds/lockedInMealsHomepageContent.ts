import type { HomepageContent } from "../../src/features/homepage/types/homepageContent.types";

export const lockedInMealsHomepageContent: HomepageContent = {
    id: "homepage",

    settings: {
        snapScroll: true,

        parallax: {
            enabled: true,
            imageUrl: "",
            opacity: 0.2,
        },
    },

    nav: {
        brandLabel: "Locked In Meals",
        links: [
            { label: "About", href: "#about" },
            { label: "Meal Plans", href: "#services" },
            { label: "Contact", href: "#contact" },
        ],
        ctaLabel: "Order Meals",
        ctaHref: "#contact",
    },

    hero: {
        eyebrow: "Meal Prep · Delivery · Discipline",
        heading: "Stay locked in with meals built for your goals.",
        body: "Fresh, ready-to-eat meal prep designed for busy schedules, clean eating, and consistent progress.",
        primaryCtaLabel: "View Meal Plans",
        primaryCtaHref: "#services",
        secondaryCtaLabel: "How It Works",
        secondaryCtaHref: "#about",
        heroImageUrl: "/src/assets/hero1.png",
        highlights: [
            "Fresh meal prep",
            "Ready-to-eat",
            "Goal-focused meals",
            "Weekly delivery",
        ],
    },

    featureStory: {
        id: "about",
        eyebrow: "Our Mission Statement",
        heading: "Meal prep built for consistency, not guesswork.",
        body: [
            "Locked In Meals helps customers stay consistent with fresh, ready-to-eat meals made for busy schedules.",
            "The goal is simple: make eating well easier, more reliable, and less stressful.",
        ],
        buttonLabel: "Read More",
        imageUrl: "/src/assets/hero1.png",
        imageAlt: "Prepared meal containers",
        imageBadgeEyebrow: "Built For Routine",
        imageBadgeBody:
            "Fresh meals designed to support clean eating and consistent habits.",
        modalEyebrow: "Our Story",
        modalHeading: "Fresh meals that help you stay locked in.",
        modalBody: [
            "Locked In Meals was created for people who want structure without spending their whole week cooking.",
            "Each meal is built around convenience, consistency, and flavor.",
            "Customers can stay focused on work, family, training, and their goals while meals are already handled.",
        ],
    },

    featureCards: {
        id: "services",
        eyebrow: "Meal Plans",
        heading: "Meal prep made for busy schedules and real goals.",
        body: "Choose meals that help you stay consistent without spending your whole week shopping, cooking, and cleaning.",
        items: [
            {
                icon: "utensils",
                title: "Ready-To-Eat Meals",
                text: "Fresh prepared meals you can heat up and eat without the extra work.",
            },
            {
                icon: "dumbbell",
                title: "Goal-Focused Options",
                text: "Meals designed to support clean eating, training, and consistent routines.",
            },
            {
                icon: "calendar",
                title: "Weekly Prep",
                text: "Stay ahead of the week with meals planned and prepared in advance.",
            },
            {
                icon: "truck",
                title: "Local Delivery",
                text: "Convenient delivery so staying locked in does not mean adding another errand.",
            },
        ],
    },

    communityCards: {
        id: "how-it-works",
        eyebrow: "How It Works",
        heading: "Eating clean should not feel like another full-time job.",
        body: "Locked In Meals keeps the process simple: choose your meals, get them prepped, then heat and eat when your schedule gets busy.",
        align: "left",
        ctaLabel: "Order Meals",
        ctaHref: "#contact",
        items: [
            {
                icon: "calendar",
                title: "Choose Your Meals",
                text: "Pick the meals or plan that fits your week, routine, and goals.",
            },
            {
                icon: "utensils",
                title: "We Prep Fresh",
                text: "Meals are prepared ahead of time so you do not have to shop, cook, or clean.",
            },
            {
                icon: "truck",
                title: "Pickup or Delivery",
                text: "Get your meals conveniently so staying consistent does not add another errand.",
            },
            {
                icon: "dumbbell",
                title: "Stay Locked In",
                text: "Heat, eat, and keep moving toward your goals with less guesswork.",
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
        eyebrow: "Stay Locked In",
        heading: "Make meals one less thing to worry about?",
        subheading: "Fresh meal prep, handled.",
        body: "Enter your email to ask about meal plans, delivery, availability, or custom prep options.",
        emailPlaceholder: "Enter your email",
        submitLabel: "Request Meal Info",
        submittingLabel: "Sending...",
        socialLinks: {
            gmail: "mailto:hello@example.com?subject=Meal Prep Inquiry | Web",
            instagram: "https://www.instagram.com/lockedinmeals/",
            facebook: "https://facebook.com",
        },
        footerText: "© 2026 Locked In Meals. All rights reserved.",
    },
};