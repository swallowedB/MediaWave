import noImage from "@/assets/NoImages.png";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../constants/urls";
import { toggleBookmarkThunk } from "../store/bookmarkSlice";
import type { AppDispatch, RootState } from "../store/store";
import { truncateText } from "../utils/textFormat";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PosterCard({
  item,
  className,
}: {
  item: MediaBase;
  className?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const bookmarks = useSelector((state: RootState) => state.bookmarks.items);
  const maxTitleLength = 14;

  const title = "title" in item ? item.title : item.name;
  const date =
    "release_date" in item
      ? item.release_date
      : "first_air_date" in item
      ? item.first_air_date
      : "";
  const type = "title" in item ? "movie" : "tv";
  
  const isBookmarked = bookmarks.some((b) => b.id === item.id);

  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setLocalBookmarked(isBookmarked);
  }, [isBookmarked]);


  const handleClick = () => {
    navigate(`/detail/${type}/${item.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    setLocalBookmarked((prev) => !prev);

    dispatch(toggleBookmarkThunk({ userId: user.uid, bookmark: item as Bookmark }));
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer
        bg-white/5 backdrop-blur-xl border border-white/0
        hover:shadow-[0_0_20px_rgba(145, 160, 255, 0.45)]
        hover:scale-[1.02] transition-all duration-500 ease-out
        ${className}`}
    >
      {/* 이미지 */}
      {item.poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}original${item.poster_path}`}
          alt={title}
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-[#1b1f3b]">
          <img src={noImage} alt="no image" className="opacity-50" />
        </div>
      )}

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05071f]/90 via-[#05071f]/40 to-transparent opacity-80" />

      <button
        onClick={handleBookmark}
        className={`absolute z-20 top-3 right-3 p-2 rounded-full cursor-pointer
          transition-all duration-500 opacity-0 scale-90
          group-hover:opacity-100 group-hover:scale-100
          ${
            localBookmarked
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.8)]"
              : "bg-black/40 text-white/70 hover:text-white hover:bg-black/60"
          }`}
      >
        <Bookmark
          className={`w-5 h-5 ${
            localBookmarked ? "fill-current drop-shadow-[0_0_6px_rgba(147,51,234,0.7)]" : ""
          }`}
        />
      </button>

      <div className="absolute bottom-0 w-full p-4 flex flex-col justify-end z-10 font-sans">
        <h3 className="text-white text-sm sm:text-base font-semibold drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]">
          {truncateText(title ?? "", maxTitleLength)}
        </h3>
        {"release_date" in item && (
          <p className="text-white/60 text-xs mt-1">
            {date?.slice(0, 4) || ""}
          </p>
        )}
      </div>


    </div>
  );
}
