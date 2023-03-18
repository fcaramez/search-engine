import { JSDOM } from "jsdom";

export const getDomElementText = (buffer: string) => {
  const htmlFile = new JSDOM(buffer);

  const words = htmlFile.window.document.body.textContent?.trim();

  const meta = htmlFile.window.document.head.getElementsByTagName("meta");

  let metaWords: any[] = [];

  for (let i = 0; i < meta.length; i++) {
    metaWords.push(meta[i].getElementsByTagName("description"));
  }

  console.log(metaWords);

  return words
    ?.split(" ")
    .map((el: string) => {
      return el.trim();
    })
    .filter((word: string) => word !== "");
};
