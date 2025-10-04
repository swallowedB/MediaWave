import axiosInstance from "./axiosInstance";

// TMDB 영화 / TV 상세
export const getMediaDetail = async (type: string, id: string) => {
  const { data } = await axiosInstance.get(`/${type}/${id}?language=ko-KR`);
  return data;
};

// 출연진, 감독 정보
export const getCredits = async (type: string, id: string) => {
  const { data } = await axiosInstance.get(`/${type}/${id}/credits?language=ko-KR`);
  return data;
};

// 스틸컷
export const getImages = async (type: string, id: string) => {
  const { data } = await axiosInstance.get(`/${type}/${id}/images`);
  return data.backdrops?.slice(0, 10);
};

// 비슷한 작품
export const getSimilar = async (type: string, id: string) => {
  const { data } = await axiosInstance.get<SimilarResponse>(`/${type}/${id}/similar?language=ko-KR&page=1`);
  return data.results?.slice(0, 7);
};
