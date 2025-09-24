import { X } from "lucide-react";
import ReactDOM from "react-dom";

export default function PreviewModal({
  videoKey,
  onClose,
}: {
  videoKey: string | null;
  onClose: () => void;
}) {
  return ReactDOM.createPortal(
      <div
        onClick={onClose} 
        className="fixed inset-0 bg-[#040322]/80 flex items-center justify-center z-100">
      <div className="relative w-[80vw] max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Trailer Preview"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>
    </div>,
    document.body
  );
}
