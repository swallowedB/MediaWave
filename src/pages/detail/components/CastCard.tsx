import { IMAGE_BASE_URL } from "../../../constants/urls";

interface CastCardProps {
  name: string;
  role?: string;
  profile_path?: string | null;
}

export default function CastCard({ name, role, profile_path }: CastCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px]">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
        {profile_path ? (
          <img
            src={`${IMAGE_BASE_URL}w185${profile_path}`}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-white/50">
            N/A
          </div>
        )}
      </div>
      <p className="text-sm text-white font-medium">{name}</p>
      {role && <p className="text-xs text-white/50">{role}</p>}
    </div>
  );
}
