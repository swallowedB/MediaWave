import PosterGrid from "../../../components/PosterGrid";

interface RecommendProps {
  items?: (Movie | Tv | Bookmark)[];
}

export default function Recommend({ items=[] }: RecommendProps) {

  return (
    <section className="w-full">
      <h2 className="text-xl text-white font-semibold mb-4">비슷한 작품 추천</h2>

      {items.length > 0 ? (
        <PosterGrid 
          items={items} 
          columns={7} 
          className="mt-4" 
        />
      ) : (
        <div className="w-full py-10 flex items-center justify-center 
                        text-white/50 text-sm font-sans 
                        bg-white/5 border border-white/10 rounded-xl
                        backdrop-blur-xl">
          추천할 작품이 없습니다.
        </div>
      )}
    </section>
  );
}
