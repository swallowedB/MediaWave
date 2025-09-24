import axiosInstance from "./axiosInstance";

/**
 * 장르 - 영화 / Tv
 * @returns 검색 결과
 */
export const fetchGenres = async (
  type: "movie" | "tv"
): Promise<Record<number, string>> => {
  try {
    const { data } = await axiosInstance.get(`/genre/${type}/list?language=en`);
    return data.genres.reduce((acc: Record<number, string>, genre: {id: number; name: string}) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error("🚨 장르를 불러오는 데 실패했습니다.", error);
    throw error;
  }
};
