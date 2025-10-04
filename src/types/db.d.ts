interface CommentData {
  id?: string; 
  movieId?: string | null;
  tvId?: string | null;
  content: string;
  userId: string;
  userName: string;
  userPhoto: string | null; 
  createdAt: number;
  likes: number;
  title?: string;
}

interface Bookmark {
  id: string;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  popularity: number;
  vote_average: number;
  type: "movie" | "tv";
  addedAt: number;
}