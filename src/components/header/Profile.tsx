import defaultImg from "@/assets/mediawaveS.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useClickOutside } from "../../hook/useClickOutside";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Profile() {
  const user = useSelector((state: RootState)=> state.auth.user)
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, ()=> setOpen(false))
  
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
      backdrop-blur-xl border border-white/10 rounded-full px-2 py-1 cursor-pointer"
      >
        <img
          src={user?.photoURL ?? defaultImg}
          alt={user?.displayName ?? "User profile"}
          className="w-8 aspect-auto rounded-full "
        />
        <p className="ml-2 text-white text-sm">{user?.displayName ?? "No-name"}</p>
        {open ? (
          <ChevronUp className="w-4 text-gray-100 ml-1" />

        ): (
          <ChevronDown className="w-4 text-gray-100 ml-1" />

        )}
      </button>
      {open && <ProfileCard isOpen={open} />}
    </div>
  );
}
