import axiosInstance from "./axiosInstance";

export const getPopularMoviesApi = (page = 1) =>
  axiosInstance.get(`/movie/popular?language=en-US&page=${page}`);

export const getTopRatedMoviesApi = (page = 1) =>
  axiosInstance.get(`/movie/top_rated?language=en-US&page=${page}`);

export const getNowPlayingMoviesApi = (page = 1) =>
  axiosInstance.get(`/movie/now_playing?language=en-US&page=${page}`);

export const getTrendingMoviesApi = (option: string) =>
  axiosInstance.get(`/trending/movie/${option}?language=en-US`);