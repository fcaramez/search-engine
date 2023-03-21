import * as cheerio from "cheerio";
import { getDomElementText } from "../helpers/getDomText";
import axios from "axios";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Accept-Encoding": "gzip, deflate, br, html",
  "Upgrade-Insecure-Requests": "1",
};

const config = {
  headers,
};

export const getRawHtml = async (url: string) => {
  try {
    const response = await axios(url, config);

    const rawHtml = response.data;

    const $ = cheerio.load(rawHtml);

    return getDomElementText($.html());
  } catch (error) {
    console.error("Error @ getRawHtml: ", error);
  }
};
