import { getPreviewVideoApi } from "../apis/videoApi";

export const videoService = {
  getPreviewKey: async (movieId: number): Promise<string | null> => {
    try {
      const { data } = await getPreviewVideoApi(movieId);
      const trailer = data.results.find(
        (v: TmdbVideo) => v.type === "Trailer" && v.site === "YouTube"
      );
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("🚨 Preview 영상 불러오기 실패", error);
      throw new Error("예고편 영상을 불러올 수 없습니다.");
    }
  },
};