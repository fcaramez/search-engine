export const getDomain = (url: string) => {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\..*/, "");
};
