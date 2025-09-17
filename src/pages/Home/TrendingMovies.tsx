import { useEffect, useState } from "react";
import { fetchPopularMovie } from "../../apis/movie";
import PosterCard from "../../components/PosterCard";

export default function TrendingMovies() {
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetchPopularMovie();
        setPopular(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <section className="">
      <h2 className="font-sans text-white font-bold text-2xl mb-4">Trending Movies</h2>
      <div className="flex items-center gap-5">
        {popular.slice(0,6).map((item) => (
          <PosterCard item={item} key={item.id} className="w-53 h-72" />
        ))}
      </div>
    </section>
  );
}
