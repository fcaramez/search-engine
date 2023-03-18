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
      score: `${(occurance!! * 100) / el?.length!!}%`,
    });
  }

  const sortedDocs = scannedDocs.sort((a, b) => {
    return a.occurance!! > b.occurance!!;
  });

  return {
    message: `Document ${sortedDocs[0].pageTitle} is your top result with a score of ${sortedDocs[0].score}`,
  };
};
