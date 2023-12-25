import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  extra: { validateConnection: false, trustServerCertificate: true },
  database: process.env.DB_NAME,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/db/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
