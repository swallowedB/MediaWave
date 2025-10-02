import { getDiscoverApi } from "../apis/discoverApi";

export const discoverService = {
  get: async (type: "movie" | "tv", params: { genre?: string; sort?: string; page?: number }) => {
    try {
      const { data } = await getDiscoverApi(type, params);
      return { results: data.results, total_pages: data.total_pages };
    } catch (error) {
      console.error("🚨 Discover API 불러오기 실패", error);
      throw error;
    }
  },
}