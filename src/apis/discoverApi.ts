import axiosInstance from "./axiosInstance";

export const getDiscoverApi = (
  type: "movie" | "tv",
  { genre, sort, page }: { genre?: string; sort?: string; page?: number }
) =>
  axiosInstance.get(`/discover/${type}`, {
    params: {
      with_genres: genre || "",
      sort_by: sort || "popularity.desc",
      page: page || 1,
      language: "ko-KR",
    },
  });