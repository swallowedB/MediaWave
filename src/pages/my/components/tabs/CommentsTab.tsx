import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getMediaDetail } from "../../../../apis/mediaApi";
import { getMyComments } from "../../../../services/commentService";
import Comment from "./Comment";

export default function CommentsTab() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [sort, setSort] = useState<"latest" | "likes">("latest");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchMyComments = async () => {
      const data = await getMyComments(user.uid);

      const withTitles = await Promise.all(
        data.map(async (c) => {
          try {
            if (c.movieId) {
              const detail = await getMediaDetail("movie", c.movieId);
              return { ...c, title: detail.title || detail.name };
            } else if (c.tvId) {
              const detail = await getMediaDetail("tv", c.tvId);
              return { ...c, title: detail.name || detail.title };
            } else {
              return { ...c, title: "알 수 없는 작품" };
            }
          } catch {
            return { ...c, title: "제목 불러오기 실패" };
          }
        })
      );
      setComments(withTitles);
    };

    fetchMyComments();
  }, [user]);

  const sorted = [...comments].sort((a, b) => {
    if (sort === "latest") return b.createdAt - a.createdAt;
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
              sort === tab.key ? "text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {tab.label}
            {sort === tab.key && (
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] 
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                shadow-[0_0_8px_rgba(147,51,234,0.8)] rounded-full"
              ></span>
            )}
          </button>
        ))}
      </div>

      {/* 댓글 목록 */}
      <section className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 flex-1">
        {paginated.map((c) => (
          <Comment
            key={c.id}
            id={c.id!}
            {...c}
            onDeleted={(id) =>
              setComments((prev) => prev.filter((comment) => comment.id !== id))
            }
          />
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
