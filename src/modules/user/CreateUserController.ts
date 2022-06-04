import { Request, Response } from 'express';
import { CreateUserService } from './services/CreateUserService';

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const { body } = req || {};

    const { name, email, password } = body || {};

    const createClient = new CreateUserService();

    const userCreate = await createClient.execute({
      name,
      email,
      password,
    });

    res.json(userCreate);
  }
}
