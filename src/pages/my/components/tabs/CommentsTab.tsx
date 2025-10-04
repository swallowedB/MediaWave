import { useState, useEffect } from "react";
import Comment from "./Comment";

type CommentData = {
  id: string;
  movieId: string;
  content: string;
  author: string;
  date: string;
  likes: number;
};

export default function CommentsTab() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [sort, setSort] = useState<"latest" | "likes">("latest");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const dummy = Array.from({ length: 27 }).map((_, i) => ({
      id: `c${i}`,
      movieId: "spiderman-3",
      content: "정말 재미있게 봤습니다 👍 정말 재미있게 봤습니다 👍 정말 재미있게 봤습니다 👍정말 재미있게 봤습니다 👍정말 재미있게 봤습니다 👍정말 재미있게 봤습니다 👍정말 재미있게 봤습니다 👍정말 재미있게 봤습니다 👍",
      author: "보아",
      date: "2024.10.10",
      likes: Math.floor(Math.random() * 5000) + 1,
    }));
    setComments(dummy);
  }, []);

  // 정렬
  const sorted = [...comments].sort((a, b) => {
    if (sort === "latest") return b.id.localeCompare(a.id);
    if (sort === "likes") return b.likes - a.likes;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="w-full h-full flex flex-col gap-2 2xl:gap-3 2xl:py-4 md:pr-4 py-2">
      {/* 정렬 탭 */}
      <div className="flex items-center gap-6 border-b border-white/10 mb-2 2xl:mb-5 pt-3 pl-5">
        {[
          { key: "latest", label: "최신순" },
          { key: "likes", label: "인기순" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSort(tab.key as typeof sort);
              setPage(1);
            }}
            className={`relative pb-2 px-3 text-sm font-medium cursor-pointer transition ${
              sort === tab.key
                ? "text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            {tab.label}
            {sort === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] 
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                shadow-[0_0_8px_rgba(147,51,234,0.8)] rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* 댓글 목록 */}
      <section className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 flex-1">
        {paginated.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </section>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-3 text-sm text-white/70 mt-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 disabled:opacity-30"
        >
          이전
        </button>
        <span className="px-2">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 disabled:opacity-30"
        >
          다음
        </button>
      </div>
    </section>
  );
}
