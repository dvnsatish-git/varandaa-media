import { useState } from "react";
import BreakingTicker from "./components/BreakingTicker";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import HeroGrid from "./components/HeroGrid";
import VideoGrid from "./components/VideoGrid";
import AmericaPanel from "./components/AmericaPanel";
import OTTGrid from "./components/OTTGrid";
import SpiritualSection from "./components/SpiritualSection";
import FarmersSection from "./components/FarmersSection";
import HousewivesSection from "./components/HousewivesSection";
import RightsSection from "./components/RightsSection";
import TrafficSection from "./components/TrafficSection";
import WeekendSection from "./components/WeekendSection";
import AchievementsSection from "./components/AchievementsSection";
import YouTubeSection from "./components/YouTubeSection";
import Sidebar from "./components/Sidebar";
import ArticleModal from "./components/ArticleModal";
import Footer from "./components/Footer";
import { useFeed, Article } from "./hooks/useFeed";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArticle = Record<string, any>;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<AnyArticle | null>(null);

  // Fetch all articles once; slice them into sections so no duplicates appear
  const { articles: allArticles } = useFeed(60);

  const handleArticleClick = (item: AnyArticle) => setSelectedArticle(item);
  const handleCloseModal = () => setSelectedArticle(null);

  // Split articles by category, no overlapping between sections
  const topArticles      = allArticles.slice(0, 3);   // hero
  const latestArticles   = allArticles.slice(3, 9);   // latest news grid
  const usedLinks = new Set([...topArticles, ...latestArticles].map((a: Article) => a.link));

  const remaining = allArticles.filter((a: Article) => !usedLinks.has(a.link));

  return (
    <div className="min-h-screen bg-cream">
      <BreakingTicker />
      <Header onSearch={setSearchQuery} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroGrid articles={topArticles} onArticleClick={handleArticleClick} />

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 py-10 pb-[60px]">
          <main>
            {searchQuery && (
              <div className="mb-6 p-4 bg-turmeric/10 border border-turmeric/30 rounded-[5px]">
                <p className="font-te text-[13px]">
                  "<strong>{searchQuery}</strong>" కోసం వెతుకుతున్నారు — Search results for: <strong>{searchQuery}</strong>
                </p>
              </div>
            )}

            <YouTubeSection />
            <VideoGrid articles={latestArticles} onArticleClick={handleArticleClick} />
            <AmericaPanel articles={remaining} onArticleClick={handleArticleClick} />
            <OTTGrid articles={remaining} onArticleClick={handleArticleClick} />
            <SpiritualSection />
            <FarmersSection />
            <HousewivesSection onArticleClick={handleArticleClick} />
            <RightsSection />
            <TrafficSection />
            <WeekendSection onArticleClick={handleArticleClick} />
            <AchievementsSection articles={remaining} />
          </main>
          <Sidebar />
        </div>
      </div>

      <Footer />
      <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
    </div>
  );
}
