import axiosInstance from "./axiosInstance";

/**
 * Multi Search
 * @returns 검색 결과
 */
export const fetchSearchResults = async (query: string, page = 1): Promise<{ results: SearchResult[]; total_pages: number }> => {
  try {
    const { data } = await axiosInstance.get(
      `/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
    );
    return { results: data.results, total_pages: data.total_pages };
  } catch (error) {
    console.error("🚨 검색 결과를 불러오는 데 실패했습니다.", error);
    throw error;
  }
};
