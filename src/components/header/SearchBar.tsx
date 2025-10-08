import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "../../hook/useDebounce";
import SearchResults from "./SearchResults";
import { searchService } from "../../services/searchService";
import { useClickOutside } from "../../hook/useClickOutside";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(wrapperRef, () => setQuery(""))

  useEffect(() => {
    if (query) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [query]);

  const handleSearch = useCallback(
    async (pageToFetch: number, isLoadMore = false) => {
      try {
        setLoading(true);
        const { results: newResults, total_pages } = await searchService.searchMulti(
          debouncedQuery,
          pageToFetch
        );

        setTotalPages(total_pages);

        if (isLoadMore) {
          setResults((prev) => [...prev, ...newResults]);
        } else {
          setResults(newResults);
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    },
    [debouncedQuery]
  );

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(page, page > 1);
    }
  }, [page, debouncedQuery, handleSearch]);

  useEffect(() => {
    if (debouncedQuery) {
      setPage(1);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div
      ref={wrapperRef} 
      className="relative flex flex-col items-center">
      <input
        type="text"
        value={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") setPage(1);
        }}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-9 bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
                  backdrop-blur-xl border border-white/10 rounded-full focus:outline-none px-3.5 text-white "
      />
      <Search
        onClick={() => setPage(1)}
        className="absolute top-1.5 right-3.5 w-5 text-white"
      />
      {query && (
        <SearchResults
          items={results}
          loading={loading}
          onClose = {() => setQuery("")}
          onLoadMore={() => {
            if (page < totalPages) {
              setPage((prev) => prev + 1);
            } else {
              console.log("📌 마지막 페이지, 더 불러올 게 없음");
            }
          }}
        />
      )}
    </div>
  );
}
