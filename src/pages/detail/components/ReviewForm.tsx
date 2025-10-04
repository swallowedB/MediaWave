import { useState } from "react";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import defaultImg from "@/assets/mediawaveS.png"

interface ReviewFormProps {
  onSubmit: (comment: {
    content: string;
    userId: string;
    userName: string;
    userPhoto: string;
  }) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    onSubmit({
      content,
      userId: user.uid,
      userName: user.displayName || "익명",
      userPhoto: user.photoURL || defaultImg,
    });
    setContent("");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-10 border border-white/10 rounded-xl bg-white/5 text-white/60 font-sans">
        <p>리뷰를 작성하려면 로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full mt-6 border-t border-white/10 pt-6"
    >
      <h2 className="text-xl text-white font-semibold">리뷰 남기기</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          user ? "작품에 대한 리뷰를 작성해주세요 ✨" : "로그인 후 리뷰 작성이 가능합니다."
        }
        className="w-full h-28 rounded-xl bg-white/5 border border-white/10 
          px-4 py-3 text-sm text-white/80 resize-none focus:outline-none 
          focus:ring-2 focus:ring-purple-500/40"
      />
      <button
        type="submit"
        disabled={!user}
        className="self-end px-5 py-2 rounded-lg bg-gradient-to-r 
        from-blue-500 to-purple-600 text-white font-medium hover:scale-[1.02] 
        transition disabled:opacity-50"
      >
        작성하기
      </button>
    </form>
  );
}
