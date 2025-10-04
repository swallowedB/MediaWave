import defaultImg from "@/assets/mediawaveS.png";
import gsap from "gsap";
import { LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/authSlice";

export default function ProfileCard({ isOpen }: { isOpen: boolean }) {
  const user = useSelector((state: RootState)=> state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (cardRef.current) {
      if (isOpen) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
        );
      } else {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: -10,
          scale: 0.95,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setShouldRender(false),
        });
      }
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleLogout = async () => {
    try{
      await logout();
      dispatch(clearUser());
      navigate('/login');
    }catch(error){
      console.error("🚨 로그아웃 실패:", error)
    }
  }

  return (
    <div
      ref={cardRef}
      className="absolute right-0 mt-2 w-58 rounded-xl shadow-lg
                 bg-gradient-to-b from-[#595d75]/40 to-[#0e1125]/60 
                 backdrop-blur-xl border border-white/30 p-4 z-50"
    >
      {/* 상단 프로필 */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
        
          <img src={user?.photoURL ?? defaultImg} className="w-10 h-10 rounded-full" />
        
        <div>
          <p className="text-white text-sm font-semibold">{user?.displayName ?? 'No-name'}</p>
          <p className="text-gray-300 text-xs">{user?.email}</p>
        </div>
      </div>

      {/* 메뉴 */}
      <ul className="flex flex-col gap-2 text-sm text-white/80">
        <li
          onClick={()=> navigate('/my')} 
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
          <User className="w-4 h-4" />
          MyPage
        </li>
        <li
          onClick={handleLogout} 
          className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer rounded-lg transition">
          <LogOut className="w-4 h-4" />
          Logout
        </li>
      </ul>
    </div>
  );
}
