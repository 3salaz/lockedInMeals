// src/config/clientConfig.ts

const env = import.meta.env;

export const clientConfig = {
  brandName: env.VITE_CLIENT_NAME || "Your Brand",
  legalName: env.VITE_CLIENT_LEGAL_NAME || env.VITE_CLIENT_NAME || "Your Brand",
  domain: env.VITE_SITE_DOMAIN || "",

  seo: {
    title: env.VITE_SITE_TITLE || "Your Brand",
    description:
      env.VITE_SITE_DESCRIPTION ||
      "A modern website built to showcase your business.",
    ogImage: env.VITE_SITE_OG_IMAGE || "/og-image.jpg",
    imageAlt: env.VITE_SITE_IMAGE_ALT || "Website preview image",
  },

  branding: {
    themeColor: env.VITE_THEME_COLOR || "#0A0A0A",
    primaryColor: env.VITE_BRAND_PRIMARY_COLOR || "#FFFFFF",
    backgroundColor: env.VITE_BRAND_BACKGROUND_COLOR || "#0A0A0A",
    textColor: env.VITE_BRAND_TEXT_COLOR || "#FFFFFF",
  },

  contact: {
    email: env.VITE_CONTACT_EMAIL || "",
    phone: env.VITE_CONTACT_PHONE || "",
    instagram: env.VITE_CONTACT_INSTAGRAM || "",
    facebook: env.VITE_CONTACT_FACEBOOK || "",
  },

  business: {
    serviceArea: env.VITE_BUSINESS_SERVICE_AREA || "",
    industry: env.VITE_BUSINESS_INDUSTRY || "Client",
    tagline: env.VITE_BUSINESS_TAGLINE || "",
  },
} as const;