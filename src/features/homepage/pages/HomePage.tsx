import { useEffect } from "react";

import SiteNav from "@/components/layout/SiteNav";

import storyImage from "@/assets/images/bodega-entrance.jpg";
import Hero from "../components/Hero";

import { useHomepageContent } from "@/features/homepage/hooks/useHomepageContent";
import FeaturedStorySection from "../components/FeaturedStorySection";
import HomepageLoader from "@/components/layout/HomepageLoader";
import FeatureCardsSection from "../components/FeatureCardsSection";
import ContactSection from "../components/ContactSection";


export default function HomePage() {

    const { homepageContent, loadingHomepageContent } = useHomepageContent();
    useEffect(() => {
        const image = new Image();
        image.src = storyImage;
    }, []);

    if (loadingHomepageContent) {
        return <HomepageLoader />;
    }

    return (
        <main
            id="top"
            className="h-dvh overflow-y-auto overflow-x-hidden scroll-smooth bg-(--color-background) text-(--color-text) snap-y snap-mandatory"
        >
            <SiteNav
                brandLabel={homepageContent.nav.brandLabel}
                links={homepageContent.nav.links}
                ctaLabel={homepageContent.nav.ctaLabel}
                ctaHref={homepageContent.nav.ctaHref}
            />
            <Hero />
            <FeaturedStorySection content={homepageContent.featureStory} />
            <FeatureCardsSection content={homepageContent.featureCards} />
            <FeatureCardsSection content={homepageContent.communityCards} />
            <FeatureCardsSection content={homepageContent.businessCards} />
            {/* <Partners /> */}
            <ContactSection content={homepageContent.contact} />
        </main>
    );
}