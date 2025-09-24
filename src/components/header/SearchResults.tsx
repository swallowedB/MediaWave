import { Loader2, SearchX } from "lucide-react";
import { useEffect, useRef } from "react";
import SearchResultItems from "./SearchResultItems";

export default function SearchResults({
  items,
  onLoadMore,
  loading,
}: {
  items: SearchResult[];
  onLoadMore: () => void;
  loading: boolean;
}) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loaderRef.current; // 지역 변수로 관리해서 쓰는 이유 (클로저 원리)
    const root = containerRef.current;
    if (!target || !root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        root,
        threshold: 0,
        rootMargin: "100px",
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target); // 클린업 함수는 나중에 실행되기 때문에 의도치 않은 값을 바라볼 수 있어서 (loaderRef.current)
    };
  }, [onLoadMore]);

  return (
    <section
      ref={containerRef}
      className="absolute mt-10 flex flex-col gap-10 items-stretch bg-gradient-to-b from-[#515a72]/20 to-[#454b5c]/40 
        backdrop-blur-lg border border-white/30 rounded-lg w-[40vw] h-[60vh] overflow-y-scroll "
    >
      {loading && items.length === 0 && (
        <div className="flex items-center justify-center h-full pt-10">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {items.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-full text-white/60 gap-2">
          <SearchX className="w-8 h-8 text-white/50" />
          <p className="text-sm font-sans">No results found</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items
              .filter((item) => item.media_type !== "person")
              .map((item) => (
                <SearchResultItems
                  key={`${item.media_type}-${item.id}`}
                  item={item}
                />
              ))}
          </div>
          <div ref={loaderRef} className="h-10" />
        </>
      )}
    </section>
  );
}
