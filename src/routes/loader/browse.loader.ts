import type { LoaderFunctionArgs } from "react-router-dom";
import { discoverService } from "../../services/discoverService";

export const fetchBrowse = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const type = (url.searchParams.get("type") as "movie" | "tv") ?? "movie";
  const sort = url.searchParams.get("sort") ?? "popularity.desc";
  const genre = url.searchParams.get("genre") ?? "";
  const page = Number(url.searchParams.get("page")) || 1;

  return await discoverService.get(type, { sort, genre, page });
};
