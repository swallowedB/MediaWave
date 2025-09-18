import PosterCard from "./PosterCard";

interface PosterGridProps {
  items: Movie[];
  columns?: number;
  rowsToShow?: number;
}

export default function PosterGrid({
  items,
  columns = 6,
  rowsToShow,
}: PosterGridProps) {
  const chunkSize = columns;
  const rows = Array.from(
    { length: Math.ceil(items.length / chunkSize) },
    (_, i) => items.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const visibleRows = rowsToShow ? rows.slice(0, rowsToShow) : rows;

  return (
    <section className="flex flex-col gap-5">
      {visibleRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-5
          grid-cols-2    
          sm:grid-cols-3  
          md:grid-cols-4  
          lg:grid-cols-6
          "
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
