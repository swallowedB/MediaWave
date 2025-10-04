import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../../components/common/Pagination";
import PosterGrid from "../../../../components/PosterGrid";
import { getBookmark } from "../../../../services/bookmarkService";
import type { RootState } from "../../../../store/store";

export default function BookmarksTab() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const data = await getBookmark(user.uid);
      setBookmarks(data);
    };

    fetchBookmarks();
  }, [user]);

  const totalPages = Math.ceil(bookmarks.length / perPage);
  const paginated = bookmarks.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="w-full h-full flex flex-col gap-4 2xl:gap-6 md:py-4 md:pr-4">
      {/* 헤더 */}
      <div className="flex border-b border-white/10 pb-1">
        <p className="text-sm text-white/50">총 {bookmarks.length}개</p>
      </div>

      {bookmarks.length > 0 ? (
        <>
          <PosterGrid items={paginated} columns={5} className="w-full 2xl:pr-3 flex-1" />
          {/* 페이지네이션 */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className=""
          />
        </>
      ) : (
        <div className="flex flex-col flex-1 gap-3 items-center justify-center">
          <div className="font-sans flex gap-2 items-center justify-center">
            <AlertCircle className="text-white/60" strokeWidth={2.5} />
            <p className="text-white/60 ">아직 저장한 작품이 없어요</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
            backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 cursor-pointer 
            text-white text-sm font-medium hover:bg-white/10 transition"
          >
            추천작 보러가기
          </button>
        </div>
      )}
    </section>
  );
}
