import axiosInstance from "./axiosInstance";


export const getPreviewVideoApi = (movieId: number) =>
  axiosInstance.get<{ results: TmdbVideo[] }>(
    `/movie/${movieId}/videos?language=en-US`
  );