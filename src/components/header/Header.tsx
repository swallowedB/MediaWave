import logo from "@/assets/Logo.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import { LogIn } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-100 flex items-center justify-between w-full px-10 fixed top-0 py-3 gap-10 
    ${
      scrolled
        ? "bg-[#0a0f2d]/20 backdrop-blur-md shadow-lg border-b border-white/10"
        : "bg-transparent"
    }
    `}
    >
      <Link to={"/"}>
        <img src={logo} alt="home" />
      </Link>
      <div className="flex-1 min-w-40 max-w-80">
        <SearchBar />
      </div>
      {user ? (
        <Profile />
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
            backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 cursor-pointer 
            text-white text-sm font-medium hover:bg-white/10 transition"
        >
          <LogIn className="w-5 h-5 mr-2" />
          LOGIN
        </button>
      )}
    </header>
  );
}
