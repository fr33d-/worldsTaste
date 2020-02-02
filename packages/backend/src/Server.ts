import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import * as httpStatusCodes from 'http-status-codes';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { cigarAttrsRoute } from './routes/CigarAttrsRouts';
import { cigarRoute } from './routes/CigarsRoute';
import { coffeeBrewingRoute } from './routes/CoffeeBrewingRoute';
import { coffeeRoute } from './routes/CoffeeRoute';
import { usersRoute } from './routes/UsersRoute';
import { authRouter } from './routes/AuthRoute';
import { errorLoggerMiddleware, errorMiddleware } from './utils/ErrorHandlerUtil';
import { createLogger } from './utils/LoggerUtil';

// Export all necessary Dtos to make them accessible from the frontend
export * from './models/dtos/UserDto';

// Track diagnostic messages
const log = createLogger('api:core');
log('Server starting...');

process.on('unhandledRejection', (error) => {
    log('Unhandled Rejection', error);
});

// Create TypeORM connection
createConnection()
    .then(() => {
        const server = express();

        // 3rd party middleware
        server.use(helmet());
        server.use(bodyParser.json());
        server.use(fileUpload());
        // This enables CORS for ALL (!) origins. Before moving to production you MUST restrict this with a proper and
        // safe configuration!
        // https://expressjs.com/en/resources/middleware/cors.html
        server.use(cors({ exposedHeaders: ['Location'] }));

        // Root route
        server.get('/', (_, result) => result.sendStatus(httpStatusCodes.FORBIDDEN));

        // Application routes
        server.use('/api/auth', authRouter);
        server.use('/api/user', usersRoute);
        server.use('/api/coffee', coffeeRoute);
        server.use('/api/coffeebrewings', coffeeBrewingRoute);
        server.use('/api/cigars', cigarRoute);
        server.use('/api/cigarAttrs', cigarAttrsRoute);

        // 404 - Not Found
        server.use((_, result) => result.sendStatus(httpStatusCodes.NOT_FOUND));

        // 500 - Internal Server Error
        server.use(errorLoggerMiddleware);
        server.use(errorMiddleware);

        // Make the server listen
        const PORT = process.env.PORT || 4000;

        server.listen(PORT, () => {
            log(`🚀 Server is listening on http://localhost:${PORT}`);
        });
    })
    .catch(log);
