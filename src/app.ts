import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { scanHtmlDocs } from "./helpers/scanHtmlDocs";
import morgan from "morgan";
import { getRawHtml } from "./scraper";
config();

const app: Application = express();

app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/search", async (req: Request, res: Response) => {
  const query = req.query.query as string;

  if (!query) {
    res.json({ message: "Please provide a query" });
    return;
  }

  res.json(
    await scanHtmlDocs(query.toLowerCase(), [
      {
        title: "test",
        url: "https://blog.logrocket.com/parsing-html-nodejs-cheerio/",
      },
    ])
  );
});

app.get("/ping", async (req: Request, res: Response) => {
  /*const website = req.query.website as string;

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
  })(); */
  res.end();
});

app.get("/", async (req: Request, res: Response) => {
  try {
    await getRawHtml("https://www.nytimes.com/");
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
