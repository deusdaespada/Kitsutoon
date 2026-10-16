import { useEffect, useMemo } from "react";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import PremiumFooter from "@/components/layout/PremiumFooter";
import RecentUpdatesSection from "@/components/home/RecentUpdatesSection";
import RecentUpdatesSkeleton from "@/components/home/RecentUpdatesSkeleton";
import LoadingSection from "@/components/home/LoadingSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ContinueReadingSection from "@/components/home/ContinueReadingSection";
import RecentlyAddedSection from "@/components/home/RecentlyAddedSection";
import MostReadSection from "@/components/home/MostReadSection";
import { useTitles } from "@/hooks/useTitles";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useGroupedRecentChapters } from "@/hooks/useGroupedRecentChapters";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  useVisitorTracking();
  const { user } = useAuth();
  const { data: titles, isLoading: titlesLoading } = useTitles();
  const { data: groupedChapters, isLoading: chaptersLoading } = useGroupedRecentChapters(40);
  const { progress } = useReadingProgress();

  useEffect(() => {
    const prefetch = () => {
      import("./Catalog");
      import("./MangaDetails");
      import("./Search");
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(prefetch, { timeout: 2000 });
    } else {
      setTimeout(prefetch, 1500);
    }
  }, []);

  const { trending, heroTitles, recentlyAdded } = useMemo(() => {
    if (!titles) return { trending: [], heroTitles: [], recentlyAdded: [] };
    const sortedByViews = [...titles].sort((a, b) => b.views - a.views);
    const sortedByDate = [...titles].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return {
      trending: sortedByViews.slice(0, 10),
      heroTitles: sortedByViews.slice(0, 5),
      recentlyAdded: sortedByDate.slice(0, 10),
    };
  }, [titles]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        <section className="relative w-full -mt-px">
          {titlesLoading ? (
            <Skeleton className="w-full h-[100svh] min-h-[560px] max-h-[920px]" />
          ) : (
            <HeroCarousel titles={heroTitles} />
          )}
        </section>

        {user && progress.length > 0 && (
          <ContinueReadingSection items={progress as any} />
        )}

        {titlesLoading ? (
          <LoadingSection title="Lançamentos" count={6} columns={6} />
        ) : (
          <RecentlyAddedSection titles={recentlyAdded as any} />
        )}

        {chaptersLoading ? (
          <RecentUpdatesSkeleton />
        ) : (
          <RecentUpdatesSection groupedChapters={groupedChapters || []} />
        )}

        {titlesLoading ? (
          <LoadingSection title="Mais Lidos" count={10} columns={3} />
        ) : (
          <MostReadSection titles={trending as any} />
        )}

        <PremiumFooter />
      </div>
    </PageTransition>
  );
};

export default Index;
