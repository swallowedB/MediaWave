interface CommentData {
  content: string; 
  userId: string;
  userName: string; 
  userPhoto?: string; 
  createdAt: number; 
  likes: number; 
  movieId?: string; 
  tvId?: string; 
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