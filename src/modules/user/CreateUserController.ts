import { Request, Response } from 'express';
import { CreateUserService } from './services/CreateUserService';

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const { body } = req || {};

    const { name, userName, email, password } = body || {};

    const createClient = new CreateUserService();

    const userCreate = await createClient.execute({
      name,
      userName,
      email,
      password,
    });

    res.json(userCreate);
  }
}
