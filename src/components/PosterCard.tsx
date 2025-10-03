import noImage from "@/assets/NoImages.png";
import { IMAGE_BASE_URL } from "../constants/urls";
import { truncateText } from "../utils/textFormat";

export default function PosterCard({
  item,
  className,
}: {
  item: Movie | Tv;
  className?: string;
}) {
  const maxTitleLength = 17;

  const title = "title" in item ? item.title : item.name;

  return (
    <div
      className={`cursor-pointer bg-white/10 rounded-xl overflow-hidden relative shadow-custom-heavy group ${className}`}
    >
      <div className="w-full h-full bg-white/10 rounded-xl overflow-hidden relative shadow-custom-heavy group">
        {/* 그라데이션 오버레이 */}
        <div className="w-full h-[50%] bottom-0 absolute bg-gradient-to-t from-[#040721] to-transparent opacity-0 group-hover:opacity-100" />

        {/* 내용 */}
        <div className="absolute font-noto bottom-[5px] flex flex-col items-start justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-[#000000]/50 rounded-3xl py-1 px-2 mb-2">
            <p className="text-white font-noto text-xs">↗ {item.popularity}</p>
          </div>
          <p className="text-xl font-semibold text-white">
            {truncateText(title, maxTitleLength)}
          </p>
          <p className="text-white font-noto text-[10px] mt-2 line-clamp-2 opacity-80">
            {item.overview}
          </p>
        </div>

        {/* 이미지 */}
        {item.poster_path ? (
          <img
            className="object-cover object-center w-full h-full "
            src={`${IMAGE_BASE_URL}original${item.poster_path}`}
            alt={title}
          />
        ) : (
          <div className="w-full h-full items-center justify-center flex bg-gray-600 object-cover object-center">
            <img className="  " src={noImage} alt="noImage" />
          </div>
        )}
      </div>
    </div>
  );
}
