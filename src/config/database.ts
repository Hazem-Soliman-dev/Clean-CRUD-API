import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "../entities/Country";
import { State } from "../entities/State";
import { City } from "../entities/City";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "test2",
  entities: [Country, State, City],
  synchronize: true,
  logging: false,
});
