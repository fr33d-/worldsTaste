import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    subscribers: [],
    migrationsTableName: "migrations",
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: false,
    synchronize: true,
    dropSchema: true,
    entities: ["./src/models/entities/**/*.js"],
    migrations: ["./src/migrations/*.js"],
    name: "default",
});
