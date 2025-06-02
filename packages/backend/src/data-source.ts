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
    entities: ["./src/models/entities/**/*.ts"],
    migrations: ["./src/migrations/*.ts"],
    name: "default",
});
