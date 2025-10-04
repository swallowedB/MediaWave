import defaultImg from "@/assets/mediawaveS.png";
import { Bookmark, MessageSquare, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: "bookmarks" | "comments" | "profile";
  setActiveTab: (tab: "bookmarks" | "comments" | "profile") => void;
}) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col bg-[#040721]/20 backdrop-blur-lg border border-white/15 items-center px-6 py-4 md:py-10 md:items-center md:w-1/5 rounded-3xl ">
      {/* 프로필 */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user?.photoURL ?? defaultImg}
          alt={user?.displayName ?? ""}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 shadow-lg"
        />
        <h2 className="mt-4 text-xl md:text-2xl font-bold text-white">
          {user?.displayName}
        </h2>
        <p className="text-sm text-white/60">{user?.email}</p>
      </div>

      {/* 탭 */}
      <div className="flex md:flex-col gap-6 md:gap-4 border-b md:border-b-0 md:border-0 border-white/10 pb-4 md:pb-0 md:pr-4 w-full justify-center md:justify-start">
        {[
          {
            key: "bookmarks",
            label: "북마크",
            icon: <Bookmark className="w-4 h-4" strokeWidth={2.5} />,
          },
          {
            key: "comments",
            label: "작성한 댓글",
            icon: <MessageSquare className="w-4 h-4" strokeWidth={2.5} />,
          },
          {
            key: "profile",
            label: "프로필 수정",
            icon: <User className="w-4 h-4" strokeWidth={2.5} />,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`
              relative flex items-center gap-2 px-3 py-2 rounded-sm
              transition-all duration-300 overflow-hidden cursor-pointer
              ${
                activeTab === tab.key
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }
            `}
          >
            {activeTab === tab.key && (
              <span
                className="absolute inset-y-3.5 left-[-10%] w-[100%]
                 bg-gradient-to-tr from-blue-500/70 via-purple-500/60 to-transparent
                 blur-sm opacity-90 pointer-events-none animate-pulse "
              />
            )}
            {tab.icon}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
