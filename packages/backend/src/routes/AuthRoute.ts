import { Router } from 'express';
import { changePassword, login } from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';

const authRouter = Router();
//Login route
authRouter.post('/login', login);

//Change my password
authRouter.post('/change-password', [checkJwt], changePassword);

export { authRouter };

