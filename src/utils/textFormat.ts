export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const overivewTruncate = (overview: string) => {
  if (overview) {
    return overview.length < 200 ? overview : overview.slice(0, 180) + "...";
  } else {
    return "This movie’s plot is being kept under wraps, but trust us - it’s a must-watch!";
  }
};

export const formatGenres = (
  ids: number[] = [],
  genresMap: Record<number, string> = {}
): string[] => {
  return ids
    .map((id) => genresMap[id] || "")
    .filter((genre) => genre !== "")
};
