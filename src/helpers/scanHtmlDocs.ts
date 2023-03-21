import { getRawHtml } from "../scraper";
import { getWordOccurence } from "./getWordOccurance";
import { WebsiteObj } from "../types";

export const scanHtmlDocs = async (keyword: string, websites: WebsiteObj[]) => {
  const scannedDocs = [];

  for (const website of websites!!) {
    let document = await getRawHtml(website.url);

    let occurrence = getWordOccurence(keyword, document);
    scannedDocs.push({
      pageTitle: website.title,
      content: document,
      occurence: occurrence,
      message: `${((occurrence!! * 100) / document?.length!!).toFixed(2)}%`,
      score: Number(((occurrence!! * 100) / document?.length!!).toFixed(2)),
    });
  }

  const sortedDocs = scannedDocs
    .sort((a, b) => b.score!! - a.score!!)
    .map((el) => {
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
