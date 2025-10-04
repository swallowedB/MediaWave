import {
  getCredits,
  getImages,
  getMediaDetail,
  getSimilar,
} from "../apis/mediaApi";

export const fetchMediaBundle = async (type: string, id: string) => {
  try {
    const [detail, credits, images, similar] = await Promise.all([
      getMediaDetail(type, id),
      getCredits(type, id),
      getImages(type, id),
      getSimilar(type, id),
    ]);

    return {
      detail,
      credits,
      images: images?.slice(-5),
      similar: similar?.slice(0, 7) || [],
    };
  } catch (error) {
    console.error("🚨 미디어 데이터 불러오기 실패:", error);
    throw error;
  }
};
