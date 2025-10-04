import { IMAGE_BASE_URL } from "../../../constants/urls";

interface StillCutsProps {
  images: { file_path: string }[];
}

export default function StillCuts({ images }: StillCutsProps) {
  const stills = images || [];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center justify-center">
      {stills.map((img, i) => (
        <div
          key={i}
          className="flex-shrink-0 max-w-[300px] w-[13.6vw] aspect-[16/9] rounded-xl overflow-hidden 
                      border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] 
                      hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] 
                      transition-transform duration-300 ease-out"
        >
          <img
            src={`${IMAGE_BASE_URL}w500${img.file_path}`}
            alt={`still-${i}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
