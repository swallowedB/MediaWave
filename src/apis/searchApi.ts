import axiosInstance from "./axiosInstance";

export const getSearchResultsApi = (query: string, page = 1) =>
  axiosInstance.get(`/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`);
