import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";

export default function BaseLayout() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#040721]">
      <div className="absolute inset-0 z-[-999]">
        <div
          className="absolute top-0 left-0 w-full h-100 z-[-50]
                      bg-gradient-to-b from-blue-500/40 to-purple-600/30 
                      blur-3xl rotate-45"
        />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
