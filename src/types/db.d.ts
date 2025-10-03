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
  type: "movie" | "tv";
  title: string;
  poster: string;
  createdAt: number;
}