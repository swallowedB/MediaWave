import axiosInstance from "./axiosInstance";

export const getGenresApi = (type: "movie" | "tv") =>
  axiosInstance.get(`/genre/${type}/list?language=ko`);