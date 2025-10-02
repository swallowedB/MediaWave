import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import PopularMovies from "./components/PopularMovies";
import Thumbnail from "./components/Thumbnail";
import TrendingMovies from "./components/TrendingMovies";

export default function Home() {
  const { nowplaying } = useLoaderData() as { nowplaying: Movie[] };
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
      {/* popular */}
      <section className="mt-20 px-20">
        <PopularMovies />
      </section>
    </main>
  );
}
