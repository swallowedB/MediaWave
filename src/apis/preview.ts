import axiosInstance from "./axiosInstance";

/**
 * 미리보기 기능
 * @returns 유튜브 예고편 key
 */
export const fetchPreviewVideo = async (movieId:number): Promise<string | null> => {
  try {
    const { data } = await axiosInstance.get<{ results: TmdbVideo[] }>(
      `/movie/${movieId}/videos?language=en-US`
    );
    
    const trailer = data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("🚨 Preview 영상 불러오기 실패", error);
    throw error;
  }
};
