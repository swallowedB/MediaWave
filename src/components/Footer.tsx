import logo from "@/assets//Logo.svg";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-main-700/5 backdrop-blur-sm mt-20 border-t border-white/10">
      <div className="px-10 py-6 flex items-center gap-5">
        {/* 로고 */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MediaWave"
            className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        {/* 카피라이트 */}
        <p className="text-white/30 text-xs pt-2">
          © {new Date().getFullYear()} CHOI BOA · All Rights Reserved
        </p>
        <a
          href="https://github.com/swallowedB"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 mt-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
        >
          <FaGithub className="text-white/70 text-lg" />
          <span className="text-white/40 text-xs">@swallowedB</span>
        </a>
      </div>
    </footer>
  );
}
