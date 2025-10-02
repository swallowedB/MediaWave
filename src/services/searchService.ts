import { getSearchResultsApi } from "../apis/searchApi";

export const searchService = {
  searchMulti: async (
    query: string,
    page = 1
  ): Promise<{ results: SearchResult[]; total_pages: number }> => {
    try {
      const { data } = await getSearchResultsApi(query, page);
      return { results: data.results, total_pages: data.total_pages };
    } catch (error) {
      console.error("🚨 검색 결과 불러오기 실패", error);
      throw new Error("검색 결과를 불러올 수 없습니다.");
    }
  },
};