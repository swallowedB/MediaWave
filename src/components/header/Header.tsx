import logo from "@/assets/Logo.svg";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 90); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`z-100 flex items-center justify-between w-full px-10 fixed top-0 py-3 gap-10 
    ${scrolled 
          ? "bg-[#0a0f2d]/20 backdrop-blur-md shadow-lg border-b border-white/10" 
          : "bg-transparent"
        }
    `}>
      <Link to={'/'}>
      <img src={logo} alt="home" />
      </Link>
      <div className="flex-1 min-w-40 max-w-80">

      <SearchBar />
      </div>
      <Profile />
    </header>
  );
}
