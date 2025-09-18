import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTrendingMovie } from "../../../apis/movie";
import PosterGrid from "../../../components/PosterGrid";

export default function TrendingMovies() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [showAll, setShowAll] = useState(false);

  gsap.registerPlugin(ScrollToPlugin);

  const handleSeeMore = () => {
    setShowAll(!showAll);
    requestAnimationFrame(() => {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: "+=700", autoKill: true },
        ease: "power3.inOut",
      });
    });
  };

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const res = await fetchTrendingMovie("week");
        setTrending(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <section className="mb-30">
      <div className="flex justify-between">
        <h2 className="font-sans text-white font-medium text-2xl mb-4">
          Trending 
        </h2>
        <button
          onClick={handleSeeMore}
          className={`flex items-center justify-center px-3 py-1 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 ${
            !showAll ? "text-white/80" : "text-white/20"
          }  hover:bg-white/10 transition cursor-pointer gap-1 h-9`}
        >
          <p className="text-sm">{!showAll ? "See more" : "See less"}</p>
          <ArrowRight className="w-4" />
        </button>
      </div>
      <PosterGrid items={trending} rowsToShow={showAll ? undefined : 1} />
    </section>
  );
}
