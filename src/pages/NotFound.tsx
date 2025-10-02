import errorStatus from "@/assets/error/404.svg";
import doubleArrow from "@/assets/error/double-arrow-icon.svg";
import oops from "@/assets/error/oops.svg";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";

const NotFound = () => {
  const oopsRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (oopsRef.current) {
      gsap.to(oopsRef.current, {
        y: -20,
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#040721] overflow-y-hidden">
      <div className="absolute inset-0 z-[-999]">
        <div
          className="absolute top-0 left-0 w-full h-100 z-[-50]
                      bg-gradient-to-b from-blue-500/40 to-purple-600/30 
                      blur-3xl rotate-45"
        />
      </div>
      <div 
      ref={oopsRef}
      className="flex flex-col items-center gap-5 h-full mb-10">
        <h1>
          <img src={errorStatus} alt="404" />
        </h1>
        <img src={oops} alt="oops" />
        <img className="w-10 aspect-auto" src={doubleArrow} alt="" />
      </div>
        <p className="text-center font-sans text-white/80 shimmer-text font-medium">
          잘못된 파도를 타신 것 같아요.
          <br />
          다시 MediaWave의 흐름 속으로 들어가 보시겠어요?
        </p>
      <Footer />
    </section>
  );
};

export default NotFound;
