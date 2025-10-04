import { useMemo, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  comments: CommentData[];
}

export default function ReviewList({ comments }: ReviewListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"createdAt" | "likes">("createdAt");
  const commentsPerPage = 10;

  const sortedComments = useMemo(() => {
    const sorted = [...comments].sort((a, b) => {
      if (sortBy === "likes") {
        return b.likes - a.likes;
      }
      return b.createdAt - a.createdAt;
    });
    return sorted;
  }, [comments, sortBy]);

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);
  const paginatedComments = useMemo(() => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    return sortedComments.slice(startIndex, endIndex);
  }, [sortedComments, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-6 mt-10 ">
      <div className="flex gap-6 border-b border-white/10 pb-2 text-sm">
        <button
          onClick={() => {
            setSortBy("createdAt");
            setCurrentPage(1);
          }}
          className={`relative font-medium transition ${
            sortBy === "createdAt"
              ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
              : "text-white/50 hover:text-white"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => {
            setSortBy("likes");
            setCurrentPage(1);
          }}
          className={`relative font-medium transition ${
            sortBy === "likes"
              ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
              : "text-white/50 hover:text-white"
          }`}
        >
          인기순
        </button>
      </div>

      <div
        className="
    grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-center mb-40

  "
      >
        {paginatedComments.length > 0 ? (
          paginatedComments.map((c) => (
            <ReviewCard key={c.createdAt} comment={c} />
          ))
        ) : (
          <p className="text-center text-white/50 py-10">
            아직 등록된 리뷰가 없습니다.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </section>
  );
}
