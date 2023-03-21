export const getDomElementText = (buffer: string) => {
  const htmlContent = buffer.toString();
  const words = htmlContent
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();


  const metaDescriptionMatch = htmlContent.match(
    /<meta\s+name="description"\s+content="([^"]*)"/
  );

  const metaDescription = metaDescriptionMatch ? metaDescriptionMatch[1] : null;

  const metaKeywordsMatch = htmlContent.match(
    /<meta\s+name="keywords"\s+content="([^"]*)"/
  );
  const metaKeywords = metaKeywordsMatch ? metaKeywordsMatch[1] : null;

  const cleanedWords = words
    .split(" ")
    .map((el: string) => {
      return el
        .replace(/[^a-zA-Z0-9]/g, "")
        .trim()
        .toLowerCase();
    })
    .filter((word: string) => word !== "");

  if (!metaKeywords) {
    return cleanedWords;
  }

  if (!metaDescription) {
    return cleanedWords;
  }

  const cleanedMetaTags = [
    ...metaDescription
      .split(" ")
      .map((el: string) => {
        return el
          .replace(/[^a-zA-Z0-9]/g, "")
          .trim()
          .toLowerCase();
      })
      .filter((word: string) => word !== ""),
    ...metaKeywords
      .split(" ")
      .map((el: string) => {
        return el
          .replace(/[^a-zA-Z0-9]/g, "")
          .trim()
          .toLowerCase();
      })
      .filter((word: string) => word !== ""),
  ];

  return [...cleanedMetaTags, ...cleanedWords];
};
