import { Heart } from "lucide-react";
import { truncateText } from "../../../../utils/textFormat";

type Props = {
  id: string;
  title?: string;
  content: string;
  author?: string;
  date: string;
  likes: number;
};

export default function Comment({ title = "🎬 스파이더맨 3", content, date, likes }: Props) {
  const maxLength = 70
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      px-5 py-4 flex flex-col gap-3 justify-between
      shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
      transition duration-300">
      
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm 2xl:text-base">{title}</h3>
        <button className="text-xs 2xl:text-sm text-white/40 hover:text-purple-300 cursor-pointer">
          삭제
        </button>
      </div>

      {/* 내용 */}
      <p className="text-white/80 text-xs 2xl:text-sm leading-relaxed">
        {truncateText(content, maxLength)}
      </p>

      {/* 하단 */}
      <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10">
        <p>{date}</p>
        <div className="flex items-center gap-1 text-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]">
          <Heart className="w-4 h-4 fill-pink-500 stroke-none" />
          <span className="text-xs font-medium">{likes}</span>
        </div>
      </div>
    </div>
  );
}
