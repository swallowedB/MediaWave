import PosterCard from "./PosterCard";

interface PosterGridProps<T extends Movie | Tv | Bookmark> {
  items: T[];
  columns?: number;
  rowsToShow?: number;
  className?: string;
}

export default function PosterGrid<T extends Movie | Tv | Bookmark>({
  items,
  columns = 7,
  rowsToShow,
  className,
}: PosterGridProps<T>) {
  const chunkSize = columns;
  const rows = Array.from(
    { length: Math.ceil(items.length / chunkSize) },
    (_, i) => items.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const visibleRows = rowsToShow ? rows.slice(0, rowsToShow) : rows;

  return (
    <section className={`flex flex-col gap-5 ${className}`}>
      {visibleRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${
            columns === 6
              ? "lg:grid-cols-6"
              : columns === 7
              ? "lg:grid-cols-7"
              : columns === 5
              ? "lg:grid-cols-5"
              : ''
          }`}
        >
          {row.map((item) => (
            <PosterCard
              key={item.id}
              item={item}
              className={`w-full aspect-[2/3]`}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
