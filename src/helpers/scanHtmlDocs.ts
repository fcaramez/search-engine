import * as fs from "fs";
import { getDomElementText } from "./getDomText";
import { getWordOccurence } from "./getWordOccurance";

export const scanHtmlDocs = (keyword: string) => {
  const dir = fs.readdirSync("./dist", "utf-8");
  const htmlDocs = dir.filter((file: string) => file.endsWith(".html"));

  const scannedDocs = [];

  for (const doc of htmlDocs) {
    let el = getDomElementText(fs.readFileSync(`./dist/${doc}`, "utf-8"));

    let occurance = getWordOccurence(keyword, el);

    scannedDocs.push({
      pageTitle: doc,
      content: el,
      occurance: occurance,
      message: `${((occurance!! * 100) / el?.length!!).toFixed(2)}%`,
      score: Number(((occurance!! * 100) / el?.length!!).toFixed(2)),
    });
  }

  const sortedDocs = scannedDocs
    .sort((a, b) => b.score!! - a.score!!)
    .map(el => {
      return {
        title: el.pageTitle,
        score: el.score,
      };
    });

  return {
    message: `Document ${sortedDocs[0].title} is your top result with a score of ${sortedDocs[0].score}%`,
    pages: { ...sortedDocs },
  };
};
