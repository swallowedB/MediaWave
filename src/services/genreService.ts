import { getGenresApi } from "../apis/genresApi";

export const genreService = {
  fetchGenres: async (
    type: "movie" | "tv"
  ): Promise<Record<number, string>> => {
    try {
      const { data } = await getGenresApi(type);
      return data.genres.reduce(
        (acc: Record<number, string>, genre: { id: number; name: string }) => {
          acc[genre.id] = genre.name;
          return acc;
        },
      );
    } catch (error) {
      console.error("🚨 장르 불러오기 실패", error);
      throw new Error("장르 데이터를 불러올 수 없습니다.");
    }
  },
};