interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* 이전 버튼 */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 disabled:opacity-30"
      >
        Prev
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(startPage + i)}
          className={`px-3 py-1 rounded-lg transition ${
            currentPage === startPage + i
              ? "bg-pink-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)] text-white"
              : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
          }`}
        >
          {startPage + i}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}
