import defaultImg from "@/assets/mediawaveS.png";
import { Camera } from "lucide-react";
import { useState } from "react";
import { updateUserProfile } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/store";
import { updateProfile } from "../../../../store/authSlice";

export default function ProfileEditTab() {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>();
  const [nickname, setNickname] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return;

  try {
    const updated = await updateUserProfile(user.uid, {
      nickname,
      profileImageFile: selectedFile,
    });

    dispatch(
        updateProfile({
          displayName: updated.nickname,
          photoURL: updated.profileImageUrl,
        })
      );

  } catch (error) {
    console.error("🚨 프로필 수정 실패:", error);
  }
};


  return (
    <section className="w-full h-full flex flex-col md:flex-row items-center gap-10 justify-center md:py-4 md:pr-20 md:pt-15">
      <div className="flex flex-col items-center justify-center md:w-1/3 md:pb-20">
        <div className="relative">
          {/* 프로필 이미지 */}
          <div
            className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-white/20 
                          bg-gradient-to-b from-[#2a2f4f]/50 to-[#0d1022]/80
                          shadow-[0_0_20px_rgba(99,102,241,0.5)] overflow-hidden flex items-center justify-center"
          >
            <img
              src={profileImage || defaultImg}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 수정 버튼 */}
          <label
            htmlFor="profile-picture-input"
            className="absolute cursor-pointer bottom-2 right-4 w-10 h-10 rounded-full 
                      bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center 
                    text-white shadow-lg hover:scale-110 transition"
          >
            <Camera className="w-5 h-5" />
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* 메인 폼 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 font-sans">
        <h2
          className="text-3xl font-extrabold text-transparent bg-clip-text 
                      bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        >
          PROFILE
        </h2>

        {/* 닉네임 */}
        <div>
          <label
            htmlFor="nickname"
            className="text-white text-sm block mb-2 font-semibold"
          >
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                      text-white placeholder-white/40 focus:outline-none focus:ring-2 
                      focus:ring-purple-500/20"
          />
        </div>

        {/* 이메일 (readonly) */}
        <div>
          <label
            htmlFor="email"
            className="text-white/20 text-sm block mb-2 font-semibold"
          >
            이메일
          </label>
          <input
            id="email"
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    text-white/50 cursor-not-allowed opacity-70"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-white/20 text-white/70 
                      hover:bg-white/10 transition"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]
                      text-white font-medium hover:scale-[1.02] transition shadow-lg"
          >
            저장
          </button>
        </div>
      </form>
    </section>
  );
}
