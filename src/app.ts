import express, { Express, Application, Request, Response } from "express";
import { config } from "dotenv";

config();

const app: Application = express();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
