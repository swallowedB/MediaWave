import { ChevronRight, Play } from "lucide-react";
import { IMAGE_BASE_URL } from "../../constants/urls";

export default function Thumbnail({
  movie,
}: {
  movie: Movie;
}) {
  return (
    <section
      className="flex-shrink-0 relative w-screen h-screen  flex items-end text-white"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}original${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#040721]/100  via-[#040721]/60 to-transparent" />

      <div className="relative z-10 p-10 max-w-2xl mb-110 ">
        <h1 className="font-sans text-4xl font-bold">{movie?.title}</h1>
        <p className="font-sans font-medium mt-4 text-sm opacity-80 w-130">{movie?.overview}</p>
        <div className="mt-6 flex gap-4">
          <button className="font-sans font-semibold px-4 py-1.5 bg-white text-[#2e2e2e] rounded-full flex items-center gap-2">
            <p >Preview</p>
            <Play className="text-[#2e2e2e] fill-current w-4" />
          </button>
          <button className="font-sans font-semibold px-4 py-1.5 bg-gray-500/30 backdrop-blur-md rounded-full flex items-center gap-1">
            <p className="pl-1">Details</p>
            <ChevronRight className="w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
