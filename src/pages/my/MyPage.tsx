import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";
import Sidebar from "./components/Sidebar";
import BookmarksTab from "./components/tabs/BookmarksTab";
import CommentsTab from "./components/tabs/CommentsTab";
import ProfileEditTab from "./components/tabs/ProfileEditTab";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<
    "bookmarks" | "comments" | "profile"
  >("bookmarks");

  return (
    <>
      <Header />
      <main className="w-full h-dvh flex items-center justify-center font-sans px-10">
        <div className="absolute z-0 inset-0 overflow-hidden opacity-70">
          <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-r from-purple-400/30 to-blue-500/30 rounded-full blur-[90px] top-[-20%] left-[-20%] " />
          <div className="absolute w-[50vw] h-[50vw] bg-gradient-to-tr from-blue-400/50 to-purple-500/30 rounded-full blur-[90px] bottom-[-10%] right-[-10%] " />
          <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tl from-indigo-500/40 via-purple-400/20 to-transparent rounded-full blur-[90px] top-1/3 left-1/2 " />
        </div>

        {/* 메인 카드 */}
        <section
          className="max-w-7xl w-[80vw] h-[75vh] min-w-130 rounded-4xl bg-[#040721]/30 backdrop-blur-xl border border-white/15 shadow-2xl 
        flex flex-col md:flex-row p-8 md:p-3 gap-10"
        >
          {/* 사이드바 */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* 컨텐츠 */}
          <div className="flex-1 overflow-y-auto h-full">
            {activeTab === "bookmarks" && <BookmarksTab />}
            {activeTab === "comments" && <CommentsTab />}
            {activeTab === "profile" && <ProfileEditTab />}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
