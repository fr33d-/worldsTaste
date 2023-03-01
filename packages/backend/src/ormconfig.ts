import { join } from "path";
import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    // export const connectionSource = {
    migrationsTableName: "migrations",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: false,
    synchronize: false,
    name: "default",
    // entities: ["src/models/entities/**/*.ts"],
    entities: [join(__dirname, "**", "src/models/entities/**/*.{ts,js}")],
    // migrations: ["src/migrations/*.ts"],
    migrations: [join(__dirname, "**", "src/migrations/*.{ts,js}")],
});

export default connectionSource;
