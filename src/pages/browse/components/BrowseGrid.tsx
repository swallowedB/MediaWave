import PosterGrid from "../../../components/PosterGrid";

export default function BrowseGrid({ items, page, setPage }: { items: Movie[]; page: number; setPage: (v: number) => void }) {
  return (
    <>
      <PosterGrid items={items} columns={7} rowsToShow={2} />
      <div className="flex justify-center mt-10 gap-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-30"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}
