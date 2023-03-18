import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import * as fs from "fs";
import { getDomElementText } from "./helpers/getDomText";
import { getWordOccurence } from "./helpers/getWordOccurance";
config();

const app: Application = express();

const PORT = process.env.PORT;

const htmlFile = fs.readFileSync(__dirname + "/a.html", "utf-8");

console.log("Cleaned html document: ", getDomElementText(htmlFile));

app.get("/search", async (req: Request, res: Response) => {
  const word = req.query.word as string;

  const wordsToSearch = getDomElementText(htmlFile);

  const wordOccurance = getWordOccurence(word, wordsToSearch) || 0;

  const score = {
    wordsFound: wordOccurance,
    score: `${(wordOccurance * 100) / wordsToSearch?.length!!}%`,
  };

  res.json(score);
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
