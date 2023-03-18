import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import * as fs from "fs";
import { scanHtmlDocs } from "./helpers/scanHtmlDocs";
import puppeteer from "puppeteer";
config();

const app: Application = express();

const PORT = process.env.PORT;

const htmlFile = fs.readFileSync(__dirname + "/a.html", "utf-8");
app.get("/search", async (req: Request, res: Response) => {
  const query = req.query.query as string;

  res.json(scanHtmlDocs(query.toLowerCase()));
});

app.get("/ping", async (req: Request, res: Response) => {
  const website = req.query.website as string;

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    const html = await page.content();

    fs.writeFileSync(
      website.replace("https://", "").replace(".com", "") + ".html",
      html
    );

    await browser.close();
  })();
  res.end();
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
