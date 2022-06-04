import { Request, Response } from 'express';
import { AuthService } from './service/AuthService';

export class AuthController {
  async execute(req: Request, res: Response) {
    const { body } = req || {};

    const { email, password } = body || {};

    const authService = new AuthService();
    const token = await authService.execute({ email, password });

    res.json(token);
  }
}
