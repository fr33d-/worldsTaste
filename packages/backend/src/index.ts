import bodyParser from "body-parser";
import { log } from "console";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import * as httpStatusCodes from "http-status-codes";
import { AppDataSource } from "./data-source";
import { authRouter } from "./routes/AuthRoute";
import { postRoute } from "./routes/BlogPostsRoute";

import { coffeeBrewingRoute } from "./routes/CoffeeBrewingRoute";
import { coffeeRoute } from "./routes/CoffeeRoute";
import { coffeeStoresRoute } from "./routes/CoffeeStoreRouts";
import { imexportRoute } from "./routes/ExImportRoute";
import { roasterRoute } from "./routes/RoasterRoute";
import { usersRoute } from "./routes/UsersRoute";
import { errorLoggerMiddleware, errorMiddleware } from "./utils/ErrorHandlerUtil";

AppDataSource.initialize()
    .then(async () => {
        // connection.runMigrations();

        const server = express();

        // 3rd party middleware
        server.use(helmet());
        server.use(bodyParser.json());
        server.use(fileUpload());
        // This enables CORS for ALL (!) origins. Before moving to production you MUST restrict this with a proper and
        // safe configuration!
        // https://expressjs.com/en/resources/middleware/cors.html

        server.use(cors({ exposedHeaders: ["Location"] }));
        // server.options("*", cors());
        server.options("*");

        // Root route
        server.get("/", (_, result) => result.sendStatus(httpStatusCodes.StatusCodes.FORBIDDEN));

        // Application routes
        server.use("/api/auth", authRouter);
        server.use("/api/user", usersRoute);
        server.use("/api/coffee", coffeeRoute);
        server.use("/api/stores", coffeeStoresRoute);
        server.use("/api/brewings", coffeeBrewingRoute);
        server.use("/api/posts", postRoute);
        server.use("/api/roaster", roasterRoute);
        server.use("/api/import", imexportRoute);
        server.use("/api/export", imexportRoute);

        // 404 - Not Found
        server.use((_, result) => result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND));

        // 500 - Internal Server Error
        server.use(errorLoggerMiddleware);
        server.use(errorMiddleware);

        // Make the server listen
        const PORT = process.env.PORT || 4000;

        server.listen(PORT, () => {
            log(`🚀 Server is listening on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));
