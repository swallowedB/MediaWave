interface SearchResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;           
  name?: string;          
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}