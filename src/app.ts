import express, { Application } from "express";
import "dotenv/config";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import logger from "./core/logger";
import dataSource from "../db/db.config";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

dataSource
  .initialize()
  .then(() => logger.info(`Data Source has been initialized`))
  .catch((e: any) => logger.error(`Data Source initialization Error ${e}`));

app.listen(process.env.PORT, () => {
  logger.info(`App running in port : ${process.env.PORT}`);
});
