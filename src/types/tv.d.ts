interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres?: Genre[];
}

interface TvGenre {
  id: number,
  name: string,
}
interface Tv {
  id: number;
  name: string;                
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;    
  popularity: number;
  vote_average: number;
  genre_ids: number[];
  media_type?: "tv";
}