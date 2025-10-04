import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMovieGenres, setTvGenres } from "../../store/genreSlice";
import { genreService } from "../../services/genreService";

export default function BaseLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGenres = async () => {
      const movieGenres = await genreService.fetchGenres("movie");
      const tvGenres = await genreService.fetchGenres("tv");
      dispatch(setMovieGenres(movieGenres))
      dispatch(setTvGenres(tvGenres));
    }

    loadGenres();
  },[dispatch])


  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#040721] w-full">
      <div className="absolute inset-0 z-[-999]">
        <div
          className="absolute top-0 left-0 w-full h-100 z-[-50]
                      bg-gradient-to-b from-blue-500/40 to-purple-600/30 
                      blur-3xl rotate-45"
        />
      </div>
      <Header />
      <ScrollRestoration />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
