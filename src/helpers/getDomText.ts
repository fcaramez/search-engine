import { JSDOM } from "jsdom";

export const getDomElementText = (buffer: string) => {
  const htmlFile = new JSDOM(buffer);

  const words = htmlFile.window.document.body.textContent?.trim();

  const metaDescription = htmlFile.window.document.head
    .getElementsByTagName("meta")
    .namedItem("description")?.content;

  const metaKeywords = htmlFile.window.document.head
    .getElementsByTagName("meta")
    .namedItem("keywords")?.content;

  const cleanedWords = words!!
    ?.split(" ")
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
    ...metaDescription!!
      .split(" ")
      .map((el: string) => {
        return el
          .replace(/[^a-zA-Z0-9]/g, "")
          .trim()
          .toLowerCase();
      })
      .filter((word: string) => word !== ""),
    ...metaKeywords!!
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
