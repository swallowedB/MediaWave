import { getOnAirTvApi, getPopularTvApi, getTopRatedTvApi } from "../apis/tvApi";

export const tvService = {
  getPopular: async (page = 1) => {
    try {
      const { data } = await getPopularTvApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 인기 TV 불러오기 실패", error);
      throw error;
    }
  },

  getTopRated: async (page = 1) => {
    try {
      const { data } = await getTopRatedTvApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 평점순 TV 불러오기 실패", error);
      throw error;
    }
  },

  getOnAir: async (page = 1) => {
    try {
      const { data } = await getOnAirTvApi(page);
      return data.results;
    } catch (error) {
      console.error("🚨 방영중 TV 불러오기 실패", error);
      throw error;
    }
  },
};