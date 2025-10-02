import axiosInstance from "./axiosInstance";

export const getPopularTvApi = (page = 1) =>
  axiosInstance.get(`/tv/popular?language=en-US&page=${page}`);

export const getTopRatedTvApi = (page = 1) =>
  axiosInstance.get(`/tv/top_rated?language=en-US&page=${page}`);

export const getOnAirTvApi = (page = 1) =>
  axiosInstance.get(`/tv/on_the_air?language=en-US&page=${page}`);