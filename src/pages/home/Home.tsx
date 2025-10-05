import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BrowsePreview from "./components/BrowsePreview";
import Thumbnail from "./components/Thumbnail";
import TrendingMovies from "./components/TrendingMovies";
import Loading from "../../components/common/Loading";

export default function Home() {
  const navigation = useNavigation();
  const { nowplaying, popular, topRated, tvPopular, tvTopRated, tvOnAir } = useLoaderData() as {
    nowplaying: Movie[];
    popular: Movie[];
    trending: Movie[];
    topRated: Movie[];
    tvTopRated: Tv[];
    tvPopular: Tv[];
    tvOnAir: Tv[];
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

  if (navigation.state === "loading") return <Loading />;

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
          title="Popular Movie"
          items={popular}
          viewAllLink="/browse?type=movie&sort=popularity.desc"
        />
        <BrowsePreview
          title="Top Rated Movie"
          items={topRated}
          viewAllLink="/browse?type=tv&sort=vote_average.desc"
        />
        <BrowsePreview
          title="Popular Tv"
          items={tvPopular}
          viewAllLink="/browse?type=tv&sort=popularity.desc"
        />
        <BrowsePreview
          title="Top Rated Tv"
          items={tvTopRated}
          viewAllLink="/browse?type=tv&sort=vote_average.desc"
        />
        <BrowsePreview
          title="OnAir Tv"
          items={tvOnAir}
          viewAllLink="/browse?type=tv"
        />
      </section>
    </main>
  );
}
