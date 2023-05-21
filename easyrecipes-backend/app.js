import express from "express";
import indexRouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("view"));

app.use(express.json());

app.use("/", indexRouter);

app.all("*", (req, res) => {
  res.status(404).send("<h1>not found</h1>");
});

export default app;
