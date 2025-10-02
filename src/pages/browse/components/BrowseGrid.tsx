import PosterGrid from "../../../components/PosterGrid";

export default function BrowseGrid({
  items,
}: {
  items: Movie[];
}) {
  return (
    <>
      <PosterGrid items={items} columns={7} rowsToShow={2} />
    </>
  );
}
