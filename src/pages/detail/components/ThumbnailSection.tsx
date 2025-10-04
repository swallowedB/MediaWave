import { Bookmark, Play } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewModal from "../../../components/PreviewModal";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import { videoService } from "../../../services/videoService";
import { toggleBookmarkThunk } from "../../../store/bookmarkSlice";
import type { AppDispatch, RootState } from "../../../store/store";

interface ThumbnailSectionProps {
  item: MediaDetail;
}

export default function ThumbnailSection({ item }: ThumbnailSectionProps) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const bookmarks = useSelector((state: RootState) => state.bookmarks.items);
  const isBookmarked = bookmarks.some((b) => b.id === String(item.id));

  const handlePreview = async () => {
    const key = await videoService.getPreviewKey(item.id);
    setVideoKey(key);
    setIsPreviewOpen(true);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    const bookmark: Bookmark = {
      id: String(item.id),
      poster_path: item.poster_path || "",
      title: item.title || item.name || "제목 없음",
      name: item.name || item.title || "제목 없음",
      release_date: item.release_date || "" ,
      first_air_date: item.first_air_date || "",
      popularity: item.popularity ?? 0,
      type: item.type ? "movie" : "tv",
      addedAt: Date.now(),
    };

    dispatch(
      toggleBookmarkThunk({
        userId: user.uid,
        bookmark,
      })
    );
  };

  return (
    <>
      <section
        className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end text-white overflow-hidden
      "
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}original${item.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        {/* 오버레이 (어두운 그라데이션) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04071f] via-[#04071f]/40 to-transparent" />

        {/* 콘텐츠 */}
        <div
          className="relative z-10 px-4 sm:px-8 md:px-40 lg:px-60 2xl:px-80 
      pb-10 sm:pb-16 md:pb-20 -bottom-20"
        >
          {/* 장르 */}
          <div className="flex gap-2 flex-wrap mb-4">
            {item.genres?.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 text-xs rounded-full 
            bg-gradient-to-r from-blue-500/20 to-purple-500/20
            border border-white/10 backdrop-blur-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* 타이틀 */}
          <h1 className="text-4xl font-bold mb-3 drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]">
            {item.title || item.name}
          </h1>

          {/* 설명 */}
          <p className="text-white/80 leading-relaxed line-clamp-3 mb-6 text-sm max-w-140 2xl:max-w-200">
            {item.overview || "설명이 제공되지 않았습니다."}
          </p>

          <div className="flex items-center w-full justify-between gap-3">
            <button
              onClick={handlePreview}
              className="font-sans font-semibold px-4 py-2 bg-white text-[#2e2e2e] 
                rounded-full flex items-center gap-2 hover:scale-105 
                transition-transform duration-300"
            >
              <p>Preview</p>
              <Play className="text-[#2e2e2e] fill-current w-4" />
            </button>

            <button
              onClick={handleBookmark}
              className={`p-2.5 rounded-full cursor-pointer transition-all duration-300
                ${
                  isBookmarked
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.7)]"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isBookmarked
                    ? "fill-current drop-shadow-[0_0_6px_rgba(147,51,234,0.7)]"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </section>
      {isPreviewOpen && (
        <PreviewModal
          videoKey={videoKey}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
}
