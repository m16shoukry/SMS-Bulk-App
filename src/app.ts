import express, { Request, Response } from "express";
import "dotenv/config";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import logger from "./core/logger";
import dataSource from "../db/db.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

dataSource
  .initialize()
  .then(() => logger.info(`Data Source has been initialized`))
  .catch((e: any) => logger.error(`Data Source initialization Error ${e}`));

app.listen(process.env.PORT, () => {
  logger.info(`App running in port : ${process.env.PORT}`);
});
