type QueryParams = Record<string, string | number | boolean | undefined | null>;

const generateQueryString = (query: QueryParams): string => {
  return Object.keys(query)
    .map((key) => {
      const value = query[key];
      if (value === undefined || value === null) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(String(value));
    })
    .filter(Boolean)
    .join("&");
};

export default generateQueryString;
