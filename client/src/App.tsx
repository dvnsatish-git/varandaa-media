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
import Sidebar from "./components/Sidebar";
import ArticleModal from "./components/ArticleModal";
import Footer from "./components/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArticle = Record<string, any>;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<AnyArticle | null>(null);

  const handleArticleClick = (item: AnyArticle) => {
    setSelectedArticle(item);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breaking Ticker */}
      <BreakingTicker />

      {/* Header */}
      <Header
        onSearch={setSearchQuery}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Navigation */}
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hero Grid (full width, dark) */}
      <HeroGrid onArticleClick={handleArticleClick} />

      {/* Main content + Sidebar */}
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 py-10 pb-[60px]">
          {/* Main Column */}
          <main>
            {/* Search result notice */}
            {searchQuery && (
              <div className="mb-6 p-4 bg-turmeric/10 border border-turmeric/30 rounded-[5px]">
                <p className="font-te text-[13px]">
                  "<strong>{searchQuery}</strong>" కోసం వెతుకుతున్నారు — Search results for: <strong>{searchQuery}</strong>
                </p>
              </div>
            )}

            <VideoGrid onArticleClick={handleArticleClick} />
            <AmericaPanel onArticleClick={handleArticleClick} />
            <OTTGrid onArticleClick={handleArticleClick} />
            <SpiritualSection />
            <FarmersSection />
            <HousewivesSection onArticleClick={handleArticleClick} />
            <RightsSection />
            <TrafficSection />
            <WeekendSection onArticleClick={handleArticleClick} />
            <AchievementsSection />
          </main>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Article Modal */}
      <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
    </div>
  );
}
