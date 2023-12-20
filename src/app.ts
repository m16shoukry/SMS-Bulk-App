import express, { Application } from "express";
import "dotenv/config";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import logger from "./core/logger";
import morgan from "morgan";
import bodyParser from "body-parser";
import dataSource from "./db/db.config";
import { authRouter } from "./routes/authRoutes";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/auth", authRouter);

dataSource
  .initialize()
  .then(() => logger.info(`Data Source has been initialized`))
  .catch((e: any) => logger.error(`Data Source initialization Error ${e}`));

app.listen(process.env.PORT, () => {
  logger.info(`App running in port : ${process.env.PORT}`);
});
