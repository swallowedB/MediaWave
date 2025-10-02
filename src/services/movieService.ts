import {
  getNowPlayingMoviesApi,
  getPopularMoviesApi,
  getTopRatedMoviesApi,
  getTrendingMoviesApi,
} from "../apis/movieApi";

export const movieService = {
  getPopular: async (page = 1): Promise<Movie[]> => {
    try {
      const { data } = await getPopularMoviesApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 인기 영화 가져오기 실패", error);
      throw new Error("인기 영화 데이터를 불러올 수 없습니다.");
    }
  },

  getTopRated: async (page = 1): Promise<Movie[]> => {
    try {
      const { data } = await getTopRatedMoviesApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 평점순 영화 가져오기 실패", error);
      throw new Error("평점순 영화 데이터를 불러올 수 없습니다.");
    }
  },

  getNowPlaying: async (page = 1): Promise<Movie[]> => {
    try {
      const { data } = await getNowPlayingMoviesApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 상영중 영화 가져오기 실패", error);
      throw new Error("상영중 영화 데이터를 불러올 수 없습니다.");
    }
  },

  getTrending: async (option: string): Promise<Movie[]> => {
    try {
      const { data } = await getTrendingMoviesApi(option);
      return data.results;
    } catch (error) {
      console.error("🚨 트렌드 영화 가져오기 실패", error);
      throw new Error("트렌드 영화 데이터를 불러올 수 없습니다.");
    }
  },
};
