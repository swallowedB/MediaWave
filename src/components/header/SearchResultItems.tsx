import noImage from "@/assets/NoImages.png";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../constants/urls";
import type { RootState } from "../../store/store";
import {
  formatGenres,
  overivewTruncate,
  truncateText,
} from "../../utils/textFormat";

export default function SearchResultItems({ item }: { item: SearchResult }) {
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres
  );

  const genres = formatGenres(item.genre_ids, movieGenres || {});
  const maxLength = 35;

  return (
    <>
      <hr className="text-white/40" />
      <section className="flex gap-5 items-center cursor-pointer px-10 py-3 hover:bg-gradient-to-b hover:from-[#625cda]/10 hover:via-[#1a223a]/40 hover:to-[#625cda]/10 transition-all ease-in-out duration-150 ">
        {/* 포스터 */}
        <div className="aspect-[2/3] min-w-20 w-[15%] rounded-md object-cover overflow-hidden bg-gray-600 flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={
              item.poster_path
                ? `${IMAGE_BASE_URL}w500${item.poster_path}`
                : noImage
            }
            alt={item.title || item.name || "noImage"}
          />
        </div>
        {/* 영화 정보 */}
        <div className="flex flex-col h-full items-start justify-between gap-2 text-white flex-1 w-[70%] ">
          <div className="flex justify-between items-center w-full ">
            {item.title ? (
              <p className="font-sans font-bold text-xl">
                {truncateText(item.title, maxLength)}
              </p>
            ) : item.name ? (
              <p className="font-sans font-bold text-xl">
                {truncateText(item.name, maxLength)}
              </p>
            ) : (
              ""
            )}
            <span className="bg-white/20 rounded-full px-2 py-1 font-sans text-xs font-medium" >{(item.media_type).toUpperCase()}</span>
          </div>
          <div className="flex items-center flex-wrap gap-1">
            {genres.length > 0 &&
              genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-block px-2 py-0.5 bg-[#151452]/30 rounded-sm text-[10px] "
                >
                  {genre}
                </span>
              ))}
          </div>
          <p className="font-sans text-xs text-white/60 w-[90%] line-clamp-3 h-[40%]">
            {overivewTruncate(item.overview)}
          </p>
        </div>
      </section>
    </>
  );
}
