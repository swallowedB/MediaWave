import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteComment } from "../../../../services/commentService";
import { truncateText } from "../../../../utils/textFormat";

type Props = {
  id: string;
  movieId?: string | null;
  tvId?: string | null;
  title?: string;
  content: string;
  userId: string;
  userName: string;
  userPhoto: string | null;
  createdAt: number;
  likes: number;
  onDeleted: (id: string) => void;
};

export default function Comment({
  id,
  movieId,
  tvId,
  title = "",
  content,
  createdAt,
  likes,
  onDeleted,
}: Props) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleNavigate = () => {
    if (movieId) navigate(`/detail/movie/${movieId}`);
    else if (tvId) navigate(`/detail/tv/${tvId}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      setIsDeleting(true);
      await deleteComment(id!);
      toast.success("댓글이 삭제되었습니다 🗑️");
      onDeleted?.(id!);
    } catch (err) {
      console.error("🚨 댓글 삭제 실패:", err);
      toast.error("댓글 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const maxLength = 70;
  return (
    <div
      onClick={handleNavigate}
      className="w-full max-w-2xl mx-auto rounded-2xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      px-5 py-4 flex flex-col gap-3 justify-between
      shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
      transition duration-300"
    >
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm 2xl:text-base">
          {title}
        </h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs 2xl:text-sm text-white/40 hover:text-purple-300 cursor-pointer"
        >
          삭제
        </button>
      </div>

      {/* 내용 */}
      <p className="text-white/80 text-xs 2xl:text-sm leading-relaxed">
        {truncateText(content, maxLength)}
      </p>

      {/* 하단 */}
      <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10">
        <p>
          {createdAt
            ? new Date(createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : ""}
        </p>
        <div className="flex items-center gap-1 text-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
          <Heart className="w-4 h-4 fill-pink-500 stroke-none" />
          <span className="text-xs font-medium">{likes}</span>
        </div>
      </div>
    </div>
  );
}
