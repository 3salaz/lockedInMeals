import { useEffect } from "react";

import SiteNav from "@/components/layout/SiteNav";
import Hero from "../components/Hero";

import { useHomepageContent } from "@/features/homepage/hooks/useHomepageContent";
import FeaturedStorySection from "../components/FeaturedStorySection";
import HomepageLoader from "@/components/layout/HomepageLoader";
import ContactSection from "../components/ContactSection";
import WeeklyMenuSection from "@/features/weeklyMenu/components/WeeklyMenuSection";
import { usePublishedWeeklyMenu } from "@/features/weeklyMenu/hooks/usePublishedWeeklyMenu";
import { useMealItems } from "@/features/meals/hooks/useMealItems";


type HomePageProps = {
    loadingTheme?: boolean;
};

export default function HomePage({ loadingTheme = false }: HomePageProps) {

    const { homepageContent, loadingHomepageContent } = useHomepageContent();
    const publishedMenuState = usePublishedWeeklyMenu();
    const mealItemsState = useMealItems();

    if (loadingTheme || loadingHomepageContent) {
        return <HomepageLoader />;
    }

    return (
        <main
            id="top"
            className="h-dvh overflow-y-auto overflow-x-hidden bg-(--color-background) text-(--color-text) snap-y snap-mandatory"
        >
            <SiteNav
                brandLabel={homepageContent.nav.brandLabel}
                links={homepageContent.nav.links}
                ctaLabel={homepageContent.nav.ctaLabel}
                ctaHref={homepageContent.nav.ctaHref}
            />
            <Hero />
            <WeeklyMenuSection
                snap
                publishedWeeklyMenu={publishedMenuState.publishedWeeklyMenu}
                loadingPublishedWeeklyMenu={publishedMenuState.loadingPublishedWeeklyMenu}
                publishedWeeklyMenuError={publishedMenuState.publishedWeeklyMenuError}
                mealItems={mealItemsState.mealItems}
                loadingMealItems={mealItemsState.loadingMealItems}
            />
            <FeaturedStorySection content={homepageContent.featureStory} />

            <ContactSection content={homepageContent.contact} />
        </main>
    );
}
