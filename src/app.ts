import express, { Application } from "express";
import { config } from "dotenv";
import * as fs from "fs";
import { getDomElementText } from "./helpers/getDomText";
config();

const app: Application = express();

const PORT = process.env.PORT;

const htmlFile = fs.readFileSync(__dirname + "/a.html", "utf-8");

console.log("Cleaned html document: ", getDomElementText(htmlFile));

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
