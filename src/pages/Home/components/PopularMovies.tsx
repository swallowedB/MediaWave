import { useEffect, useRef, useState } from "react";
import { fetchPopularMovie } from "../../../apis/movie";
import PosterGrid from "../../../components/PosterGrid";

export default function PopularMovies() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const res = await fetchPopularMovie(page);
        setPopular((prev) => [...prev, ...res]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, {
      threshold: 0,
      rootMargin: "100px"
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="flex flex-col mb-30">
      <h2 className="font-sans text-white font-medium text-2xl mb-4">
        Popular
      </h2>
      <PosterGrid items={popular} />
      <div ref={sentinelRef} />
    </section>
  );
}
