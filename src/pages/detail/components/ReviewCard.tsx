import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { db } from "../../../lib/firebase";
import {
  deleteComment,
  toggleLikeComment,
  updateComment,
} from "../../../services/commentService";

interface ReviewCardProps {
  comment: CommentData;
}

export default function ReviewCard({ comment }: ReviewCardProps) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const isOwner = currentUser && currentUser.uid === comment.userId;

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!currentUser) return;
      const likeRef = doc(
        db,
        "comments",
        comment.id!,
        "likes",
        currentUser.uid
      );
      const likeDoc = await getDoc(likeRef);
      setIsLiked(likeDoc.exists());
    };
    checkLikedStatus();
  }, [comment.id, currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("🚨 로그인 후 이용해주세요!");
      return;
    }
    setIsLoading(true);

    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await toggleLikeComment(comment.id!, currentUser.uid);
    } catch (err) {
      console.error("🚨 좋아요 처리 실패:", err);
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedContent.trim()) return;
    try {
      await updateComment(comment.id!, editedContent);
      setIsEditing(false);
    } catch (err) {
      console.error("🚨 댓글 수정 실패:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠어요?")) return;
    try {
      await deleteComment(comment.id!);
    } catch (err) {
      console.error("🚨 댓글 삭제 실패:", err);
    }
  };

  return (
    <div className="text-white px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
            {comment.userPhoto ? (
              <img
                src={comment.userPhoto}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">{comment.userName}</p>
            <p className="text-xs text-white/40">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 text-xs text-white/40 pt-1">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="hover:text-blue-400 flex items-center gap-1"
                >
                  수정
                </button>
                <p>|</p>
                <button
                  onClick={handleDelete}
                  className="hover:text-pink-400 flex items-center gap-1"
                >
                  삭제
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="hover:text-green-400 flex items-center gap-1"
                >
                  저장
                </button>
                <p>|</p>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(comment.content);
                  }}
                  className="hover:text-gray-400 flex items-center gap-1"
                >
                  취소
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-20 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500/40"
        />
      ) : (
        <p className="text-sm text-white/80">{comment.content}</p>
      )}

      <div className="flex items-center justify-end gap-2 text-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`transition-transform duration-300 ${
            isLiked ? "scale-110" : "scale-100"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked
                ? "fill-pink-500 stroke-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
                : "stroke-pink-500 hover:fill-pink-400/40"
            }`}
          />
        </button>
        <span className="text-xs font-medium">{likesCount}</span>
      </div>
    </div>
  );
}
