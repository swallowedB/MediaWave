import type { LoaderFunctionArgs } from "react-router-dom";
import { fetchMediaBundle } from "../../services/mediaService";

export const mediaDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { type, id } = params;
  if (!type || !id) throw new Error("Invalid media request");

  return await fetchMediaBundle(type, id);
};