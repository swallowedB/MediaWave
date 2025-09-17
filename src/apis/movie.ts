import axiosInstance from "./axiosInstance";

/**
 * popular 
 * @returns 인기있는 영화 리스트 목록
 */
export const fetchPopularMovie = async (page = 1): Promise<Movie[]> => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/popular?language=en-US&page=${page}`
    );
    return data.results;
  } catch (error) {
    console.error("🚨 popular 영화 리스트 불러오는 데 실패했습니다.", error);
    throw error;
  }
};

/**
 * Top rated
 * @returns 평점순 영화 리스트 목록
 */
export const fetchTopRateMovie = async (page = 1): Promise<Movie[]> => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    return data.results;
  } catch (error) {
    console.error("🚨 top_rated 영화 리스트 불러오는 데 실패했습니다.", error);
    throw error;
  }
};

/**
 * Now Playing
 * @returns 상영중인 영화 리스트 목록
 */
export const fetchNowPlayingMovie = async (page = 1): Promise<Movie[]> => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/now_playing?language=en-US&page=${page}`
    );
    return data.results;
  } catch (error) {
    console.error("🚨 now_playing 영화 리스트 불러오는 데 실패했습니다.", error);
    throw error;
  }
};
