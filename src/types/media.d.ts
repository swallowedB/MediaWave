type MediaBase = Movie | Tv | Bookmark;

interface MediaDetail extends MediaBase {
  backdrop_path: string;
  title?: string;
  name?: string;
  overview: string;
  genres?: { id: number; name: string }[];
  runtime?: number; 
  episode_run_time?: number[];
  status?: string;
  tagline?: string;
  homepage?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  production_countries?: { name: string }[];
  production_companies?: { name: string; logo_path: string | null }[];
}

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