import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import BrowsePreview from "./components/BrowsePreview";
import Thumbnail from "./components/Thumbnail";
import TrendingMovies from "./components/TrendingMovies";

export default function Home() {
  const { nowplaying, popular, trending, topRated } = useLoaderData() as {
    nowplaying: Movie[];
    popular: Movie[];
    trending: Movie[];
    topRated: Movie[];
  };
  const slidesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (nowplaying.length === 0 || !slidesRef.current) return;

    const totalSlides = nowplaying.length;
    const tl = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < totalSlides; i++) {
      tl.to(slidesRef.current, {
        xPercent: -100 * (i + 1),
        duration: 1,
        delay: 3,
        ease: "power2.inOut",
      });
    }
  }, [nowplaying]);

  return (
    <main className="w-full min-h-screen ">
      <section className="relative w-screen h-screen ">
        <div ref={slidesRef} className="flex w-full h-full z-10">
          {nowplaying.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <section className="-mt-50 2xl:-mt-95 relative z-20 px-20 ">
        <TrendingMovies />
      </section>

      <section className="flex flex-col px-20 gap-20 mb-40">
        <BrowsePreview
          title="Popular"
          items={popular}
          viewAllLink="/browse?type=movie&sort=popularity.desc"
        />
        <BrowsePreview
          title="Trending Now"
          items={trending}
          viewAllLink="/browse?type=movie&sort=trending"
        />
        <BrowsePreview
          title="Top Rated"
          items={topRated}
          viewAllLink="/browse?type=movie&sort=vote_average.desc"
        />
      </section>
    </main>
  );
}
