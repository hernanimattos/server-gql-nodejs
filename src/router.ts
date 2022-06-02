import { Router } from 'express';
import { AuthController } from './modules/auth/AuthController';
import { CreateUserController } from './modules/user/CreateUserController';

const routes = Router();

routes.post('/user', new CreateUserController().execute);
routes.post('/auth', new AuthController().execute);

export { routes };
