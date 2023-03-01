import { DataSource } from "typeorm";

const connectionSource = new DataSource({
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
    entities: ["src/models/entities/**/*.ts"],
    migrations: ["src/migrations/*.ts"],
});

export default connectionSource;
