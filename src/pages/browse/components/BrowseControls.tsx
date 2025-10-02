import { Film, Filter, Tv } from "lucide-react";
import { useEffect, useState } from "react";
import { genreService } from "../../../services/genreService";

interface Props {
  mediaType: "movie" | "tv";
  setMediaType: (v: "movie" | "tv") => void;
  sort: string;
  setSort: (v: string) => void;
  genre: string;
  setGenre: (v: string) => void;
}

export default function BrowseControls({
  mediaType,
  setMediaType,
  sort,
  setSort,
  genre,
  setGenre,
}: Props) {
  const [genres, setGenres] = useState<Record<number, string>>({});

  useEffect(() => {
    genreService.fetchGenres(mediaType).then(setGenres).catch(console.error);
  }, [mediaType]);
  return (
    <>
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-[#4facfe] via-[#7366ff] to-[#4facfe] gradient-animate
          drop-shadow-[0_0_12px_rgba(115,102,255,0.5)]
          "
        >
          Browse {mediaType === "movie" ? "Movie" : "TV Show"}
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 font-medium ">
          {/* MediaType */}
          <div className="flex gap-2 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-1.5 shadow-[0_0_25px_rgba(115,102,255,0.2)]">
            <button
              onClick={() => setMediaType("movie")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                mediaType === "movie"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/20"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Film className="w-4 h-4" strokeWidth={2.5} /> Movie
            </button>
            <button
              onClick={() => setMediaType("tv")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                mediaType === "tv"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-purple-600/20 "
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Tv className="w-4 h-4" strokeWidth={2.5} /> TV
            </button>
          </div>

          {/* Genre */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur">
            <Filter className="w-4 h-4 text-white/50" />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-transparent text-white/80 focus:outline-none text-sm"
            >
              <option value="">All Genres</option>
              {Object.entries(genres).map(([id, name]) => (
                <option key={id} value={id} className="bg-slate-900">
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 shadow-inner">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-white/80 focus:outline-none text-sm cursor-pointer pr-2"
            >
              <option value="popularity.desc">Popularity</option>
              <option value="release_date.desc">Latest</option>
              <option value="vote_average.desc">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
