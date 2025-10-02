import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { discoverService } from "../../services/discoverService";
import BrowseControls from "./components/BrowseControls";
import BrowseGrid from "./components/BrowseGrid";

export default function Browse() {
  const initialData = useLoaderData() as {
    results: Movie[];
    total_pages: number;
  };

  const [items, setItems] = useState<Movie[]>(initialData.results);
  const [page, setPage] = useState(1);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [totalPages, setTotalPages] = useState(initialData.total_pages);

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await discoverService.get(mediaType, {
        sort,
        genre,
        page,
      });
      setItems(results);
      setTotalPages(totalPages);
    };
    fetchData();
  }, [mediaType, sort, genre, page, totalPages]);

  return (
    <section className="mt-28 font-sans mb-40 px-20 md:px-40">
      <BrowseControls
        mediaType={mediaType}
        setMediaType={setMediaType}
        sort={sort}
        setSort={setSort}
        genre={genre}
        setGenre={setGenre}
      />

      <BrowseGrid items={items} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
