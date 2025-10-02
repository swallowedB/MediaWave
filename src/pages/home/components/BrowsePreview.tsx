import { Link } from "react-router-dom";
import PosterGrid from "../../../components/PosterGrid";
import { ArrowRight } from "lucide-react";

export default function BrowsePreview({
  title,
  items,
  viewAllLink = "/browse",
}: {
  title?: string;
  items?: Movie[];
  viewAllLink?: string;
}) {
  if (!items || items.length === 0) {
    return (
      <section className="py-10 text-center text-white/50 italic">
        No {title} available.
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 font-sans">
        <h2 className="text-2xl font-medium text-white">{title}</h2>
        <Link
          to={viewAllLink}
          className={`flex items-center justify-center px-3 py-1 rounded-lg backdrop-blur-md 
          bg-white/5 border border-white/10 text-sm hover:text-white hover:bg-white/20
          text-white/80 cursor-pointer gap-1 h-9`}
        >

          View All
          <ArrowRight className="w-4" />
        </Link>
      </div>

      <PosterGrid items={items} rowsToShow={1} />
    </section>
  );
}
