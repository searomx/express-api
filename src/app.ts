import express from "express";
import dotenv from "dotenv";
import articlesRouter from "./modules/articles/articles.routes";
import authenticationRouter from "./modules/authentication/authentication.routes";

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());


app.get("/healthcheck", (_req, res) => {
  res.send("API is up and running!");
});

app.use("/articles", articlesRouter);
app.use("/authentication", authenticationRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
