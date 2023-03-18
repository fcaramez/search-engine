import { JSDOM } from "jsdom";

export const getDomElementText = (buffer: string) => {
  const htmlFile = new JSDOM(buffer);

  const words = htmlFile.window.document.body.textContent?.trim();

  return words
    ?.split(" ")
    .map((el: string) => {
      return el.trim();
    })
    .filter((word: string) => word !== "");
};
