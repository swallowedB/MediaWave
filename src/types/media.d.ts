interface BaseMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
}

interface Movie extends BaseMedia {
  title: string;
  release_date: string;
  runtime?: number;
  type: "movie";
}

interface Tv extends BaseMedia {
  name: string;
  first_air_date: string;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  type: "tv";
}

interface Bookmark {
  id: number | string;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  popularity?: number;
  type: "movie" | "tv";
  addedAt?: number;
  overview?: string;       
  vote_average?: number; 
}

interface MediaDetail extends BaseMedia {
  genres?: { id: number; name: string }[];
  status?: string;
  tagline?: string;
  homepage?: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  production_countries?: { name: string }[];
  production_companies?: { name: string; logo_path: string | null }[];
  type: "movie" | "tv";
}

type MediaBase = Movie | Tv | Bookmark;

interface Image {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
}

interface ImagesResponse {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
}

type SimilarResult = SimilarItem[];

interface SimilarResponse {
  page: number;
  results: SimilarItem[];
  total_pages: number;
  total_results: number;
}

interface MediaLoaderData {
  detail: MediaDetail;
  credits: CreditsResponse;
  images: Image[];
  similar: SimilarResult;
}

interface ImageItem {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}

interface ImagesResponse {
  backdrops: ImageItem[];
  posters: ImageItem[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}
