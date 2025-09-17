import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { fetchNowPlayingMovie } from "../../apis/movie";
import Thumbnail from "./Thumbnail";
import TrendingMovies from "./TrendingMovies";

export default function Home() {
  const [nowplaying, setNowPlaying] = useState<Movie[]>([]);
  const slidesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetchNowPlayingMovie();
        setNowPlaying(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNowPlaying();
  }, []);

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
      <section className="relative w-screen h-screen overflow-hidden">
        <div ref={slidesRef} className="flex w-full h-full z-10">
          {nowplaying.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center">
          <TrendingMovies />
        </div>
      </section>
      <section>
        <h1 className="h-100">Movies </h1>
      </section>
    </main>
  );
}
