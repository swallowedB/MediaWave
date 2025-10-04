import CastCard from "./CastCard";

interface CastSectionProps {
  credits: CreditsResponse;
}

export default function CastSection({ credits }: CastSectionProps) {
  const cast = credits.cast?.slice(0, 10) || [];
  const directors = credits.crew?.filter((c) => c.job === "Director") || [];

  return (
    <section className="w-full h-full text-white">
      <h2 className="text-xl font-semibold mb-4">출연진 & 감독</h2>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {directors.map((d) => (
          <CastCard
            key={`director-${d.id}`}
            name={d.name}
            role="감독"
            profile_path={d.profile_path}
          />
        ))}
        {cast.map((c) => (
          <CastCard
            key={c.id}
            name={c.name}
            role={c.character}
            profile_path={c.profile_path}
          />
        ))}
      </div>
    </section>
  );
}
