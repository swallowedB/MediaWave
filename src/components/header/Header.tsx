import logo from "@/assets/Logo.svg";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

export default function Header() {
  return (
    <header className="z-100 flex items-center justify-between w-full px-10 fixed top-5 gap-10 ">
      <img src={logo} alt="home" />
      <div className="flex-1 min-w-40 max-w-80">

      <SearchBar />
      </div>
      <Profile />
    </header>
  );
}
