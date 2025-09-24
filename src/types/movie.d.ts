interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; 
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieGenre {
  id: number,
  name: string,
}

interface TmdbVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;     
  site: "YouTube" | "Vimeo";
  size: number; 
  type: "Trailer" | "Teaser" | "Clip" | "Featurette";
  official: boolean;
  published_at: string;
  id: string;
}
