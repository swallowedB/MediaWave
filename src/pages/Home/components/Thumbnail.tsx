import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { fetchPreviewVideo } from "../../../apis/preview";
import { IMAGE_BASE_URL } from "../../../constants/urls";
import PreviewModal from "../../../components/PreviewModal";

export default function Thumbnail({ movie }: { movie: Movie }) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = async () => {
    const key = await fetchPreviewVideo(movie.id);
    setVideoKey(key);
    setIsPreviewOpen(true);
  };

  return (
    <section
      className="flex-shrink-0 relative w-screen h-screen flex items-end text-white"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}original${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#040721]/100  via-[#040721]/60 to-transparent" />

      <div className="relative z-10 pb-80 2xl:pb-115 max-w-2xl px-20 ">
        <h1 className="font-sans text-4xl font-bold w-120">{movie?.title}</h1>
        <p className="font-sans font-medium mt-4 text-sm opacity-80 w-120">
          {movie?.overview}
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={handlePreview} 
            className="font-sans font-semibold px-4 py-1.5 bg-white text-[#2e2e2e] rounded-full flex items-center gap-2">
            <p>Preview</p>
            <Play className="text-[#2e2e2e] fill-current w-4" />
          </button>
          <button className="font-sans font-semibold px-4 py-1.5 bg-gray-500/30 backdrop-blur-md rounded-full flex items-center gap-1">
            <p className="pl-1">Details</p>
            <ChevronRight className="w-5" />
          </button>
        </div>
      </div>
      {isPreviewOpen && (
        <PreviewModal
          videoKey={videoKey}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </section>
  );
}
