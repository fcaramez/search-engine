import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import * as fs from "fs";
import { getDomElementText } from "./helpers/getDomText";
import { getWordOccurence } from "./helpers/getWordOccurance";
import { scanHtmlDocs } from "./helpers/scanHtmlDocs";
config();

const app: Application = express();

const PORT = process.env.PORT;

const htmlFile = fs.readFileSync(__dirname + "/a.html", "utf-8");
app.get("/search", async (req: Request, res: Response) => {
  const word = req.query.word as string;

  res.json(scanHtmlDocs(word));
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
