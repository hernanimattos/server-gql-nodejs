import { Request, Response } from 'express';
import { AuthService } from './AuthService';

export class AuthController {
  async execute(req: Request, res: Response) {
    const { body } = req || {};

    const { username, password } = body || {};

    const authService = new AuthService();
    const token = await authService.execute({ username, password });

    res.json(token);
  }
}
