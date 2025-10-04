import { Loader2, SearchX } from "lucide-react";
import { FixedSizeList as List } from "react-window";
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
  const ITEM_HEIGHT = 160;

  return (
    <section
      className="absolute z-40 mt-10 bg-gradient-to-b from-[#515a72]/20 to-[#454b5c]/40 
        backdrop-blur-3xl border border-white/30 rounded-lg w-[40vw] h-[60vh] overflow-hidden"
    >

      {loading && items.length === 0 && (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
      )}

      {!loading && items.length === 0 && (
      <div className="w-full h-full flex items-center justify-center">

        <div className="flex flex-col items-center text-white/60 gap-2">
          <SearchX className="w-8 h-8 text-white/50" />
          <p className="text-sm font-sans">No results found</p>
        </div>
        </div>
      )}

      {items.length > 0 && (
        <>
          <List
            height={600}
            itemCount={items.length}
            itemSize={ITEM_HEIGHT}
            width="100%"
            onItemsRendered={({ visibleStopIndex }) => {
              if (visibleStopIndex >= items.length - 1 && !loading) {
                onLoadMore();
              }
            }}
          >
            {({ index, style }) => (
              <div style={style}>
                <SearchResultItems item={items[index]} />
              </div>
            )}
          </List>

          {loading && (
            <div className="absolute bottom-2 w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </>
      )}
    </section>
  );
}
