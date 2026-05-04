// src/config/clientConfig.ts

export const clientConfig = {
    brandName: "Locked In Meals",
    legalName: "Locked In Meals",
    domain: "https://lockedinmeals.com",

    seo: {
        title: "Locked In Meals | Meal Prep Delivery",
        description:
            "Fresh, ready-to-eat meal prep built for clean eating, consistency, and staying locked in.",
        ogImage: "/og-image.jpg",
        imageAlt: "Locked In Meals meal prep delivery",
    },

    branding: {
        themeColor: "#0A0A0A",
        primaryColor: "#6BFF2A",
        backgroundColor: "#0A0A0A",
    },

    contact: {
        email: "hello@lockedinmeals.com",
        phone: "",
        instagram: "",
        facebook: "",
    },

    business: {
        serviceArea: "San Francisco Bay Area",
        industry: "Meal Prep Delivery",
        tagline: "Stay locked in.",
    },
} as const;